from rest_framework_simplejwt.authentication import JWTAuthentication
import logging

logger = logging.getLogger(__name__)

class DebugJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            logger.debug("No Authorization header provided")
        else:
            logger.debug(f"Authorization header: {header}")

        raw_token = self.get_raw_token(header)
        if raw_token is None:
            logger.debug("No token found in the Authorization header")
        else:
            logger.debug(f"Token extracted: {raw_token}")

        validated_token = self.get_validated_token(raw_token)
        user = self.get_user(validated_token)

        logger.debug(f"Authenticated user: {user}")
        return user, validated_token
