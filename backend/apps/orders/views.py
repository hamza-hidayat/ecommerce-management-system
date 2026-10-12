from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from .models import Order, OrderItem
from .serializers import OrderSerializer
from apps.cart.models import Cart


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == "admin":
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)

        if not cart.items.exists():
            return Response(
                {"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.create(
            user=request.user,
            full_name=request.data.get("full_name"),
            email=request.data.get("email"),
            phone_number=request.data.get("phone_number"),
            address=request.data.get("address"),
            city=request.data.get("city"),
            postal_code=request.data.get("postal_code"),
            payment_method=request.data.get("payment_method", "cash"),
            total_price=cart.total_price,
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
            )

        cart.items.all().delete()
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # NEW: Send email when admin updates order status
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        old_status = instance.status

        response = super().update(request, *args, **kwargs)
        new_status = response.data.get("status")

        # If status changed, send email
        if old_status != new_status:
            subject = f"Order #{instance.id} Status Updated"
            message = f"Hello {instance.full_name},\n\nYour order status has been updated to: {new_status.upper()}.\n\nThank you for shopping with ShopZone!"
            send_mail(
                subject,
                message,
                "noreply@shopzone.com",
                [instance.email],
                fail_silently=True,
            )

        return response
