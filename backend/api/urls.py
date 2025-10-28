from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_snacks, name='home'),  # Existing
    path('snacks/', views.get_snacks, name='snack_list'),  # Existing
    path('snacks/<int:snack_id>/', views.get_snack_detail, name='snack_detail'),  # New
    path('register/', views.register_view, name='register'),  # New
    path('login/', views.login_view, name='login'),          # New
    path('logout/', views.logout_view, name='logout'),       # New
    path('me/', views.current_user_view, name='current_user'),
    path('contact/', views.contact_submit, name='contact_submit'),  # New
    path('contacts/', views.get_contacts, name='get_contacts'),     # New
    path('orders/', views.get_orders, name='get_orders'),           # New
    path('orders/create/', views.create_order, name='create_order'), # New
    path('orders/<str:order_id>/status/', views.update_order_status, name='update_order_status'), # New
]
