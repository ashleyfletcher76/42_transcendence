from django.urls import path
from . import views
from .views import health_check, verify_user, UserExistsView, UserProfileView, AddFriendView, BlockUserView
from .views.get_user_info_view import get_single_username, get_usernames

urlpatterns = [
	path("register/", views.UserRegisterView.as_view(), name="user-register"),
	path("verify/", verify_user, name="verify-user"),
	path("health/", health_check, name="health-check"),
	path("exists/<int:user_id>/", UserExistsView.as_view(), name="user-exists"),
	path("profile/", UserProfileView.as_view(), name="user-profile"),
	path("get-single-username/<int:user_id>/", get_single_username, name="get-single-username"),
	path("get-usernames/", get_usernames, name="get-usernames"),
    
	path("add-friend/", views.AddFriendView.as_view(), name="add-friend"),
    path("block-user/", views.BlockUserView.as_view(), name="block-user"),
]
