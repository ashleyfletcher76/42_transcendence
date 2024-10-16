from django.urls import path
from . import views

urlpatterns = [
	path('send/', views.SendMessageView.as_view(), name='send-message'),
	path('history/', views.ChatHistoryView.as_view(), name='chat-history'),
]