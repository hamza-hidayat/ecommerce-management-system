from rest_framework import serializers
from .models import Review
from apps.products.models import Product


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    product = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "user",
            "product",
            "product_id",
            "rating",
            "comment",
            "created_at",
        ]

    def create(self, validated_data):
        product_id = validated_data.pop("product_id")
        product = Product.objects.get(id=product_id)
        # 'user' is already passed by views.py, so we just add the product
        review = Review.objects.create(product=product, **validated_data)
        return review
