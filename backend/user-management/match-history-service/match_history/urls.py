from django.urls import path
# from .views.match_history_view import get_match_history, add_match_detail
from .views.health_check_view import health_check

urlpatterns = [
	path("health/", health_check, name="health-check"),

	# path("get-match-history/", get_match_history, name="get_match_history"),
	# path("add-match-history/", add_match_detail, name="add_match_detail"),
]
