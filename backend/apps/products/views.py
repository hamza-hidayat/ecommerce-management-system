from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from shared.permissions import IsAdminOrReadOnly


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ["category", "category__slug"]
    search_fields = ["name", "description"]
    ordering_fields = ["price", "created_at"]
