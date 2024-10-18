## User Management API

Endpoints
1. User Registration

Endpoint: /api/users/register/
Method: POST

Registers a new user by creating an account with a username and password.
Request Body:

```json
{
	"username": "string",
	"password": "string"
}
```
Response:

- Success (201 Created):

```json
{
	"message": "User created successfully"
}
```

- Failure (400 Bad Request):

- When username is already taken or the input is invalid:

```json
		{
			"username": ["A user with that username already exists."]
		}
```

2. User Login (Token Generation)

Endpoint: /api/users/login/
Method: POST

Authenticates a user and returns a JWT token (both access and refresh tokens).
Request Body:

```json
{
	"username": "string",
	"password": "string"
}
```

Response:

- Success (200 OK):

```json
{
	"refresh": "string",  // JWT refresh token
	"access": "string"    // JWT access token
}
```

- Failure (401 Unauthorized):

```json
	{
		"detail": "No active account found with the given credentials"
	}
```

3. Token Refresh

Endpoint: /api/users/token/refresh/
Method: POST

Refreshes the access token using the refresh token.
Request Body:

```json
{
	"refresh": "string"
}
```

Response:

- Success (200 OK):

```json
{
	"access": "string"   // New JWT access token
}
```

- Failure (401 Unauthorized):

```json
	{
		"detail": "Token is invalid or expired"
	}
```

4. User Logout

Endpoint: /api/users/logout/
Method: POST

Logs out the user by invalidating the session.
Response:

- Success (200 OK):

```json
	{
		"message": "Logged out successfully"
	}
```

Authentication Flow:

- Register a user by making a POST request to /api/users/register/.
- Login by making a POST request to /api/users/login/, which returns a JWT access and refresh token.
- Use the access token to authenticate requests (as a Bearer token in the Authorization header).
- Refresh the token when it expires by making a POST request to /api/users/token/refresh/ with the refresh token.
- Logout the user by making a POST request to /api/users/logout/.

