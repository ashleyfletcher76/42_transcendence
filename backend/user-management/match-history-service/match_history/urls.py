from django.urls import path
from .views.match_history_view import MatchHistoryView
from .views.match_detail_view import MatchDetailView
from .views.health_check_view import health_check

urlpatterns = [
	path("health/", health_check, name="health-check"),

	path("get-match-history/", MatchHistoryView.as_view(), name="get_match_history"),
	path("add-match-history/", MatchDetailView.as_view(), name="add_match_detail"),
]
