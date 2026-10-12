from rest_framework import serializers
from .models import Product
from apps.categories.models import Category
from apps.categories.serializers import CategorySerializer


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "category",
            "category_id",
            "name",
            "slug",
            "description",
            "price",
            "stock",
            "image",
            "is_active",
            "created_at",
        ]

    def create(self, validated_data):
        category_id = validated_data.pop("category_id")
        category = Category.objects.get(id=category_id)
        return Product.objects.create(category=category, **validated_data)

    def update(self, instance, validated_data):
        if "category_id" in validated_data:
            category_id = validated_data.pop("category_id")
            instance.category = Category.objects.get(id=category_id)
        return super().update(instance, validated_data)
