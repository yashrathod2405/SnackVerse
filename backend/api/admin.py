from django.contrib import admin

# Register your models here.
from .models import Snack, Contact, Order, OrderItem

class SnackAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'image']
    list_display_links = ['name']

class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'created_at']
    list_display_links = ['name']
    list_filter = ['created_at']
    search_fields = ['name', 'email']
    readonly_fields = ['created_at']
    ordering = ['-created_at']

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['snack', 'quantity', 'price', 'total_price']

class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'customer_name', 'customer_email', 'total_amount', 'status', 'created_at']
    list_display_links = ['order_id']
    list_filter = ['status', 'created_at']
    search_fields = ['order_id', 'customer_name', 'customer_email']
    readonly_fields = ['order_id', 'created_at', 'updated_at']
    ordering = ['-created_at']
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Order Information', {
            'fields': ('order_id', 'status')
        }),
        ('Customer Information', {
            'fields': ('customer_name', 'customer_email')
        }),
        ('Order Details', {
            'fields': ('total_amount', 'created_at', 'updated_at')
        }),
    )

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'snack', 'quantity', 'price', 'total_price']
    list_filter = ['order__created_at']
    search_fields = ['order__order_id', 'snack__name']

admin.site.register(Snack, SnackAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)