from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "price"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "full_name",
            "email",
            "phone_number",
            "address",
            "city",
            "postal_code",
            "total_price",
            "status",
            "payment_method",
            "is_paid",
            "received_by",
            "items",
            "created_at",
        ]
        # Only 'status', 'is_paid', and 'received_by' can be edited by the admin
        read_only_fields = [
            "id",
            "full_name",
            "email",
            "phone_number",
            "address",
            "city",
            "postal_code",
            "total_price",
            "payment_method",
            "items",
            "created_at",
        ]
