## API Documentation for Authentication Service

## Summary:

The authentication service is responsible for user authentication, token issuance, and handling user logouts. It uses JWT (JSON Web Tokens) to authenticate users and manage sessions. This service is critical for ensuring secure access to other microservices by issuing tokens that validate a user's identity.

Each microservice, including the authentication service, is now backed by its own dedicated PostgreSQL database, enhancing data separation and security. The authentication service connects to its own database container, auth-db, for storing and managing user authentication data. This separation provides a modular, scalable architecture, allowing each service to maintain its data independently.

Note: All endpoints require HTTPS for secure communication. In development, if using self-signed certificates, you may need to disable certificate verification when testing with tools like curl or wscat.

## Authentication Flow

The authentication service utilizes JWT to handle user sessions. A user logs in using their credentials, and the service returns a token. This token is then passed in the headers of future requests to access protected resources across the application.

## HTTPS Endpoints
1. User Login

Description: Authenticates a user by their username and password and returns a JWT token pair (access and refresh tokens).

```plaintext
POST https://localhost:8443/auth/login/
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
POST https://localhost:8443/auth/token/refresh/
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

3. User Logout

Description: Logs out the user by blacklisting the provided refresh token, invalidating it for future use.

```plaintext
POST https://localhost:8443/auth/logout/
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

- Security Note: Always use HTTPS for requests and securely store JWT tokens to prevent unauthorized access.
