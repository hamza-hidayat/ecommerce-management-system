from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Roles(models.TextChoices):
        CUSTOMER = "customer", "Customer"
        ADMIN = "admin", "Admin"

    role = models.CharField(
        max_length=10, choices=Roles.choices, default=Roles.CUSTOMER
    )
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    # Required fields for Django admin and createsuperuser
    REQUIRED_FIELDS = ["email", "role"]

    def __str__(self):
        return f"{self.username} ({self.role})"
