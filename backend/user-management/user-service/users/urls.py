from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views.register_view import UserRegisterView
from .views.health_check_view import health_check
from .views.add_friend_view import AddFriendView
from .views.block_user_view import BlockUserView
from .views.verify_views import verify_user, UserExistsView, UserProfileView
from .views.update_profile_view import update_profile
from .views.get_user_info_view import (
	get_single_user_data,
	get_usernames,
	get_profile_token,
	get_profile_info,
	get_all_profiles,
	get_user_id_by_nickname
)

urlpatterns = [
	path("health/", health_check, name="health-check"),

	path("register/", UserRegisterView.as_view(), name="user-register"),

	path("verify/", verify_user, name="verify-user"),
	path("exists/<int:user_id>/", UserExistsView.as_view(), name="user-exists"),

	path("profile-info-token/", get_profile_token, name="get-user-profile"),
	path("profile-info/", get_profile_info, name="get-profile-info"),
	path("profile-list/", get_all_profiles, name="get-all-profiles"),
	path("update-profile/", update_profile, name="update-profiles"),

	path("get-single-user-data/<int:user_id>/", get_single_user_data, name="get-single-user-data"),
	path("get-usernames/", get_usernames, name="get-usernames"),
	path("get-user-by-nickname/", get_user_id_by_nickname, name="get-user-by-nickname"),

	path("add-friend/", AddFriendView.as_view(), name="add-friend"),
	path("block-user/", BlockUserView.as_view(), name="block-user"),
]

# serve media files during development
if settings.DEBUG:
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
