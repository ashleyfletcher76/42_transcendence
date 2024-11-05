## Overview
This document provides example commands to verify that each service is correctly configured with HTTPS. It covers basic user actions (register, login, logout, chat) and includes a command to check SSL usage within the PostgreSQL database.

---

## Table of Contents
- [User Service Testing](#user-service-testing)
  - [Register a New User](#register-a-new-user)
  - [Login with Existing User](#login-with-existing-user)
  - [Logout User](#logout-user)
- [Chat Service Testing](#chat-service-testing)
  - [Connect to Chat Room](#connect-to-chat-room)
  - [Send a Message](#send-a-message)
  - [Receive a Message](#receive-a-message)
- [PostgreSQL SSL Verification](#postgresql-ssl-verification)
- [Redis (Stunnel) SSL Verification](#redis-(stunnel)-ssl-verification)
- [Summary](#summary)

---

## User Service Testing

### Register a New User
Use the following `curl` command to register a new user via the `user-service`. This command sends a POST request to the `register` endpoint using HTTPS.

```bash
curl -k -X POST https://localhost:9443/users/register/ \
	-H "Content-Type: application/json" \
	-d '{"username": "newuser", "password": "password123"}'
```

* Expected Response:
```plaintext
{
	"message": "User created successfully"
}
```

* Note: The -k flag is used to ignore certificate verification for self-signed certificates.

### Login with Existing User
The following command logs in an existing user via the auth-service. It authenticates the user and returns a JWT token pair.

```bash
curl -k -X POST https://localhost:8443/auth/login/ \
	-H "Content-Type: application/json" \
	-d '{"username": "newuser", "password": "password123"}'
```

* Expected Response:
```json
{
	"refresh": "your_refresh_token_here",
	"access": "your_access_token_here"
}
```

### Logout User
Use this command to log out the user by blacklisting the refresh token. This demonstrates that the auth-service is accessible over HTTPS.

```bash
curl -k -X POST https://localhost:8443/auth/logout/ \
	-H "Content-Type: application/json" \
	-d '{"refresh_token": "your_refresh_token_here"}'
```

* Expected Response:
```json
{
	"message": "Logged out successfully"
}
```

## Chat Service Testing
### Connect to Chat Room

Use the following command to connect to the chat-service via WebSocket using HTTPS.

```bash
wscat -c wss://localhost:10443/ws/chat/room_name/ --no-check
```

* Expected Behavior: A WebSocket connection is established to the specified chat room, allowing real-time message exchange.

### Send a Message

After connecting to the chat room, you can send a message using the following format:

```json
{"message": "Hello everyone!"}
```

* Expected Behavior: The message is broadcast to all users in the chat room.

### Receive a Message

When another user sends a message in the chat room, you should receive it in the following format:

```json
{"message": "Hello everyone!", "username": "JohnDoe"}
```

## PostgreSQL SSL Verification
Verifying SSL in PostgreSQL

To confirm that PostgreSQL is configured with SSL, connect to the postgres_db container and check the SSL status with the following commands.

1. Enter the PostgreSQL Container:

```bash
make exec-postgres_db
```

2. Access the PostgreSQL Database:

```bash
psql -U $POSTGRES_USER -d $POSTGRES_DB
```

3. Check SSL Status: Run the following command inside the psql interface to confirm SSL is enabled.

```sql
SHOW ssl;
```

* Expected Output:

```plaintext
ssl
-----
on
(1 row)
```

4. Verify SSL Connections: To see the details of current SSL connections, use:

```sql
SELECT * FROM pg_stat_ssl;
```

* Expected Output:

```plaintext

 pid | ssl | version |         cipher         | bits | client_dn | client_serial | issuer_dn
-----+-----+---------+------------------------+------+-----------+---------------+-----------
 123 | t   | TLSv1.3 | TLS_AES_256_GCM_SHA384 |  256 |           |               |
 ...
```

## Redis (Stunnel) SSL Verification
To verify that Redis is operating securely over TLS using Stunnel, follow these steps.
1. Enter the Stunnel container:
```bash
docker exec -it stunnel /bin/sh
```

2. Use the redis-cli command with TLS options to connect to the Redis server via Stunnel on the secure port (6380):

```bash
redis-cli -h localhost -p 6380 --tls --cert /etc/stunnel/stunnel.crt --key /etc/stunnel/stunnel.key --cacert /etc/stunnel/stunnel.crt
```

* Expected Prompt: After connecting successfully, you should see a prompt like localhost:6380>.

3. Test Redis Connection: To confirm the connection is working, run the following command in the redis-cli prompt:

```plaintext
PING
```

* Expected Response:

```plaintext
PONG
```

This indicates that Redis is accessible over a secure TLS connection through Stunnel.

## Summary

This document demonstrates example commands for:

* Verifying HTTPS functionality on user-service, auth-service, and chat-service.
* Checking SSL usage in postgres_db.
* Testing secure TLS connection to Redis through Stunnel.

These commands validate the secure configuration of each container and ensure encrypted communication across the application.
