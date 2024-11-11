## API Documentation for User Service

## Summary:

The User Service handles user-related operations such as registration and profile management, managing storage, retrieval, and updates to user data. This service does not manage authentication but requires valid JWT tokens for access to protected routes.

Each microservice has its dedicated PostgreSQL database, with the User Service connecting to its user-db container for user data management. This architecture enables isolated data storage, improving both security and scalability.

Note: While internal communication occurs over HTTP, NGINX ensures that all external requests use HTTPS, securing client interactions. During development with self-signed certificates, you may need to disable certificate verification when using tools like curl.

## HTTP Endpoints
1. User Registration

Description: Registers a new user in the system. This endpoint accepts user details and creates a new user entry in the database.


```plaintext
POST http://localhost:8001/users/register/
```

Here is the full command to make life simpler:
```bash
curl -X POST http://localhost:8001/users/register/ \
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

Description: Retrieves the profile of the currently authenticated user. This requires the user to be authenticated using a valid JWT. ----------- Not yet implemented!!

```plaintext
GET http://localhost:8001/users/profile/
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
PUT http://localhost:8001/users/profile/
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

## Database Information for User Service

The User Service connects to its own dedicated PostgreSQL database (user-db). This setup isolates user-related data within this service, ensuring database-level separation from other services. Each microservice uses its specific database credentials for improved security and scalability.

* Database Access: To manually access the User Service database, run the following command inside the user-db container:

```bash
psql -U $USER_SERVICE_USER -d $USER_SERVICE_DB
```

or just run:

```bash
make exec-user-db
```

and then follow the prompt.

## Error Codes

- 400 Bad Request: Validation errors, such as duplicate usernames or invalid field values.
- 401 Unauthorized: Missing or invalid JWT token.
- 404 Not Found: If attempting to access a user resource that does not exist.

## Summary for Frontend:

* User Registration:  Use /users/register/ to create new users (HTTPS enforced externally)
* Profile Management: Access user details using the /users/profile/ endpoint, which will return the user's current data. You can also update user information using the same route.
* Authentication Requirement: Except for registration, all endpoints require JWT tokens in headers. Ensure secure handling of tokens in authenticated requests.

- Security Note: Ensure that tokens are securely stored and use HTTPS externally through NGINX. Internal service communication over HTTP is secured by the isolated network.
