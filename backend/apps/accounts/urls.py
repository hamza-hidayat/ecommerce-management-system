from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    UserProfileView,
    CustomerListView,
    ChangePasswordView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("customers/", CustomerListView.as_view(), name="customers"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
]
