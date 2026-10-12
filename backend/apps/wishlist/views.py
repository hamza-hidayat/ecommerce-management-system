from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Wishlist
from .serializers import WishlistSerializer
from apps.products.models import Product


class WishlistViewSet(viewsets.ViewSet):
    def list(self, request):
        wishlist, created = Wishlist.objects.get_or_create(user=request.user)
        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)

    @action(detail=False, methods=["post"])
    def toggle(self, request):
        wishlist, created = Wishlist.objects.get_or_create(user=request.user)
        product_id = request.data.get("product_id")
        product = get_object_or_404(Product, id=product_id)

        if product in wishlist.products.all():
            wishlist.products.remove(product)
            return Response(
                {"message": "Removed from wishlist", "in_wishlist": False},
                status=status.HTTP_200_OK,
            )
        else:
            wishlist.products.add(product)
            return Response(
                {"message": "Added to wishlist", "in_wishlist": True},
                status=status.HTTP_200_OK,
            )
