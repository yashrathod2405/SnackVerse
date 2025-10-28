from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from .models import Snack, Contact, Order, OrderItem
import json
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
import uuid
from datetime import datetime


def get_snacks(request):
    snacks = Snack.objects.all()
    data = [
        {
            "id": snack.id,
            "name": snack.name,
            "description": snack.description,
            "price": snack.price,
            "image": snack.image.url if hasattr(snack, 'image') and snack.image else "",
        }
        for snack in snacks
    ]
    return JsonResponse(data, safe=False)


def get_snack_detail(request, snack_id):
    snack = get_object_or_404(Snack, id=snack_id)
    data = {
        "id": snack.id,
        "name": snack.name,
        "description": snack.description,
        "price": snack.price,
        "image": snack.image.url if hasattr(snack, 'image') and snack.image else "",
    }
    return JsonResponse(data)


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({'message': 'User created successfully'})


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)


@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out'})


@csrf_exempt
def current_user_view(request):
    if request.user.is_authenticated:
        return JsonResponse({'username': request.user.username, 'email': request.user.email})
    else:
        return JsonResponse({'error': 'User not logged in'}, status=401)


@csrf_exempt
def contact_submit(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            message = data.get('message')

            if not all([name, email, message]):
                return JsonResponse({'error': 'All fields are required'}, status=400)

            # Create contact entry
            contact = Contact.objects.create(
                name=name,
                email=email,
                message=message
            )

            return JsonResponse({
                'message': 'Contact form submitted successfully!',
                'id': contact.id
            })

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)


def get_contacts(request):
    # For now, let's make this accessible without authentication
    # In production, you'd want to restrict this to admin users
    contacts = Contact.objects.all()
    data = [
        {
            'id': contact.id,
            'name': contact.name,
            'email': contact.email,
            'message': contact.message,
            'created_at': contact.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
        for contact in contacts
    ]
    return JsonResponse(data, safe=False)


@csrf_exempt
def create_order(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            cart_items = data.get('cartItems', [])
            total_amount = data.get('totalAmount', 0)
            customer_name = data.get('customerName', 'Guest Customer')
            customer_email = data.get('customerEmail', 'guest@example.com')

            if not cart_items:
                return JsonResponse({'error': 'Cart is empty'}, status=400)

            # Generate unique order ID
            order_id = f"ORD{datetime.now().strftime('%Y%m%d')}{str(uuid.uuid4())[:8].upper()}"

            # Create order
            order = Order.objects.create(
                order_id=order_id,
                customer_name=customer_name,
                customer_email=customer_email,
                total_amount=total_amount,
                status='pending'
            )

            # Create order items
            for item in cart_items:
                snack = get_object_or_404(Snack, id=item['id'])
                OrderItem.objects.create(
                    order=order,
                    snack=snack,
                    quantity=item.get('quantity', 1),
                    price=snack.price
                )

            return JsonResponse({
                'message': 'Order created successfully!',
                'order_id': order.order_id,
                'total_amount': order.total_amount
            })

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)


def get_orders(request):
    # For now, let's make this accessible without authentication
    # In production, you'd want to restrict this to admin users
    orders = Order.objects.all().prefetch_related('items__snack')
    data = []
    
    for order in orders:
        order_data = {
            'id': order.id,
            'order_id': order.order_id,
            'customer_name': order.customer_name,
            'customer_email': order.customer_email,
            'total_amount': order.total_amount,
            'status': order.status,
            'created_at': order.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'items': [
                {
                    'snack_name': item.snack.name,
                    'quantity': item.quantity,
                    'price': item.price,
                    'total_price': item.total_price
                }
                for item in order.items.all()
            ]
        }
        data.append(order_data)
    
    return JsonResponse(data, safe=False)


@csrf_exempt
def update_order_status(request, order_id):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_status = data.get('status')
            
            if new_status not in dict(Order.ORDER_STATUS_CHOICES):
                return JsonResponse({'error': 'Invalid status'}, status=400)
            
            order = get_object_or_404(Order, order_id=order_id)
            order.status = new_status
            order.save()
            
            return JsonResponse({
                'message': 'Order status updated successfully',
                'order_id': order.order_id,
                'status': order.status
            })
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Only POST method allowed'}, status=405)
