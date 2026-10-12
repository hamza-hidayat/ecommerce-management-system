from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count
from apps.orders.models import Order
from apps.accounts.models import User
from apps.products.models import Product


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "admin":
            return Response({"error": "Unauthorized"}, status=403)

        # Calculate Stats
        total_sales = (
            Order.objects.aggregate(Sum("total_price"))["total_price__sum"] or 0
        )
        total_orders = Order.objects.count()
        total_customers = User.objects.filter(role="customer").count()

        # Low stock products (less than 10 in stock)
        low_stock_products = Product.objects.filter(stock__lt=10).values(
            "id", "name", "stock"
        )

        return Response(
            {
                "total_sales": total_sales,
                "total_orders": total_orders,
                "total_customers": total_customers,
                "low_stock_products": list(low_stock_products),
            }
        )
