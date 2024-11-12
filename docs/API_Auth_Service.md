## API Documentation for Authentication Service

## Summary:

The authentication service handles user authentication, token issuance, and user logout. It uses JWT (JSON Web Tokens) to validate users’ identities across microservices. This service is pivotal in enforcing secure access control through token-based authentication.

Each microservice has its own PostgreSQL database to enhance data separation and security. The authentication service connects to its own auth-db container for managing authentication data independently. This modular approach keeps each service isolated, ensuring better scalability and security.

Note: The backend only works with HTTP between services, but NGINX manages external threats and enforces HTTPS for requests reaching the services from outside. In development, if using self-signed certificates with NGINX, you may need to disable certificate verification when testing with tools like curl.

## Authentication Flow

The authentication service utilizes JWT to manage user sessions. Users authenticate using credentials, and the service issues a token. This token must be included in the Authorization header for accessing protected endpoints across the application.

## HTTPS Endpoints
1. User Login

Description: Authenticates a user by their username and password and returns a JWT token pair (access and refresh tokens).

```plaintext
POST http://localhost:8000/auth/login/
```

- Request Payload:

```plaintext
{
	"username": "your_username",
	"password": "your_password"
}
```

- Response:

```plaintext
{
	"refresh": "your_refresh_token",
	"access": "your_access_token"
}
```

- Error Response: If the credentials are invalid, you will get a 401 Unauthorized error.

```plaintext
{
	"detail": "No active account found with the given credentials"
}
```

2. Refresh Token

Description: Refreshes the access token by providing the valid refresh token, extending the user's session without requiring them to log in again.

```plaintext
POST http://localhost:8000/auth/token/refresh/
```

- Request Payload:

```plaintext
{
	"refresh": "your_refresh_token"
}
```

- Response:

```plaintext
{
	"access": "new_access_token"
}
```

- Error Response: If the refresh token is expired or invalid, you will receive a 401 Unauthorized error.

3. Validate Token

Description: Validates the access token by checking it against the user-service to confirm user existence.

```bash
POST http://localhost:8000/auth/validate-token/
```

Request Header:

Authorization: Bearer your_access_token

Response (If token is valid and user exists):

```json
{
    "detail": "Token is valid"
}
```

Error Responses:

- User not found:
```json
{
    "error": "User not found"
}
```
- Invalid or expired token:

```json
{
    "detail": "Invalid or expired token"
}
```

4. User Logout

Description: Logs out the user by blacklisting the provided refresh token, invalidating it for future use.

```plaintext
POST http://localhost:8000/auth/logout/
```

- Request Payload:

```plaintext
{
	"refresh_token": "your_refresh_token"
}
```

- Response:

```plaintext
{
	"message": "Logged out successfully"
}
```

- Error Response: If the token is already blacklisted or invalid, the server responds with an error.

```plaintext
{
	"error": "Token is invalid or already blacklisted"
}
```

## JWT Token Usage

1. Access Token: This is a short-lived token used to authenticate requests. It is sent in the Authorization header in the following format:

```plaintext
Authorization: Bearer your_access_token
```

2. Refresh Token: This is a long-lived token used to refresh the access token once it expires. It should be securely stored and only sent when refreshing the access token.

## Error Codes

- 401 Unauthorized: If authentication fails due to invalid credentials or an invalid/expired token.
- 400 Bad Request: If the request body is not properly formatted or is missing required fields.

## Summary for Frontend:

* Login Flow: Use /auth/login/ to obtain access and refresh tokens upon user login.
* Token Management: The frontend should store the tokens (e.g., in localStorage or sessionStorage) and send the access token in the Authorization header for all authenticated API requests.
* Token Refresh: Use /auth/token/refresh/ to refresh the access token before it expires, keeping the user session active without requiring them to log in again.
* Logout Flow: Call /auth/logout/ and send the refresh token to ensure the user is logged out and their session invalidated.

- Security Note: Ensure all user-facing requests are HTTPS-secured through NGINX, even though backend services communicate over HTTP. Store JWT tokens securely to prevent unauthorized access.
