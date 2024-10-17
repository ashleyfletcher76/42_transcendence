from django.urls import path
from . import views

urlpatterns = [
	path('register/', views.UserRegisterView.as_view(), name='user-register'),
	path('login/', views.LoginView.as_view(), name='login'),
	path('logout/', views.LogoutView.as_view(), name='logout'),
]
