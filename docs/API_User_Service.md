## API Documentation for User Service

## Summary:

The User Service is responsible for handling user-related data and functionality, such as registration and managing user profiles. The service manages the storage, retrieval, and modification of user information in a centralized manner. This service does not handle authentication but requires valid JWT tokens for protected routes.

Note: All endpoints require HTTPS for secure communication. In development, if using self-signed certificates, you may need to disable certificate verification when testing with tools like curl.

## HTTP Endpoints
1. User Registration

Description: Registers a new user in the system. This endpoint accepts user details and creates a new user entry in the database.


```plaintext
POST https://localhost:9443/users/register/
```

Here is the full command to make life simpler:
```bash
curl -k -X POST https://localhost:9443/users/register/ \
    -H "Content-Type: application/json" \
    -d '{"username": "newuser", "password": "password123"}'
```

- Request Payload:

```plaintext
{
	"username": "newuser",
	"password": "newpassword123"
}
```

- Response:

```plaintext
{
	"message": "User created successfully"
}
```

- Error Response: If there are validation errors (e.g., the username already exists), you will receive a 400 Bad Request error:

json

```plaintext
{
  "username": [
    "This field must be unique."
  ]
}
```

2. User Profile

Description: Retrieves the profile of the currently authenticated user. This requires the user to be authenticated using a valid JWT.

```plaintext
GET https://localhost:9443/users/profile/
```

- Request Headers:

Authorization: Bearer your_access_token

- Response:

```plaintext
{
	"username": "currentuser",
	"email": "user@example.com",
	"date_joined": "2023-12-22T14:00:00Z"
}
```

- Error Response: If the user is not authenticated or the token is invalid, you will receive a 401 Unauthorized error:

```plaintext
{
	"detail": "Authentication credentials were not provided."
}
```

3. Update User Profile

Description: Updates the user’s profile information, such as their username or email. This endpoint also requires authentication.

```plaintext
PUT https://localhost:9443/users/profile/
```

- Request Headers:

Authorization: Bearer your_access_token

- Request Payload:

```plaintext
{
	"username": "newusername",
	"email": "newemail@example.com"
}
```

- Response:

```plaintext
{
	"message": "Profile updated successfully"
}
```

- Error Response:

- 400 Bad Request: Invalid fields or username/email already in use.
- 401 Unauthorized: If the token is missing or invalid.

```plaintext
{
	"detail": "Authentication credentials were not provided."
}
```

## Error Codes

- 400 Bad Request: Validation errors, such as duplicate usernames or invalid field values.
- 401 Unauthorized: Missing or invalid JWT token.
- 404 Not Found: If attempting to access a user resource that does not exist.

## Summary for Frontend:

* User Registration: Use /users/register/ to create new users over HTTPS.
* Profile Management: Access user details using the /users/profile/ endpoint, which will return the user's current data. You can also update user information using the same route.
* Authentication Requirement: All requests, except for registration, require JWT tokens in the headers. Ensure tokens are securely sent in all authenticated requests.

- Security Note: Always use HTTPS for requests and securely store JWT tokens to prevent unauthorized access.
