## Updates to Chat Service, Token, and APIs

1. Token Enhancements

The token now includes additional information, making it more useful for frontend and backend operations.
### Fields Included in the Token

* user_id: The unique ID of the authenticated user.
* nickname: The display name or nickname of the user.

### How to Use

* To access the nickname or user_id, decode the token using the secret key.
* Example Decoded Token:
```json
    {
        "user_id": 123,
        "nickname": "JohnD"
    }
```
### Frontend Impact

* Token includes both user id and nickname now

2. Tournament Chat API

A new API has been added to handle tournament-related chat groups. Whenever a new tournament is created, a request must be sent to this API to create the corresponding chat group.
### Endpoint

* URL: /chat/create-tournament-chat/
* Method: POST
* Authorization: Requires a valid token.

### Payload Structure

* Headers:
```plaintext
Authorization: Bearer <valid-jwt-token>
```
* Body (JSON):
```json
    {
        "tournament_name": "FriendlyTournament2024"
    }
```
### Response

* Success:
```json
{
    "message": "Tournament chat group 'chat_tournament_FriendlyTournament2024' created.",
    "user_id": 123
}
```
* Error:

- Missing Authorization Token:
```json
{
    "error": "Authorization token is missing or invalid"
}
```
- Missing Tournament Name:
```json
{
    "error": "Tournament name is required."
}
```
- Duplicate Tournament Name:
```json
        {
            "error": "Tournament name already exists."
        }
```
### Important Notes

* Must ensure a valid Authorization token is passed with the request.
* The tournament name must be unique; if a group with the same name already exists, the API will return an error.

3. Tournament Chat Communication

Once a tournament chat group is created using the Tournament Chat API, the frontend can communicate with the group using WebSocket.
### WebSocket Endpoint

* URL: ws://<chat-service-url>/chat/tournament/<tournament_name>/
* Replace <tournament_name> with the actual tournament name.

### Message Structure

To send a message to the tournament chat group, use the type functionality in the WebSocket message payload.
### Message Payload Example
```json
{
    "type": "tournament",
    "to": "FriendlyTournament2024",
    "message": "Welcome to the tournament chat!"
}
```
### Fields

* type: Must be "tournament" to indicate a message for a tournament chat group.
* to: The tournament name (must match the tournament_name used in the Tournament Chat API).
* message: The actual message to broadcast to the tournament group.

### Behavior

1. The message is routed to the correct tournament chat group in the channel layer.
2. All participants in the tournament group receive the broadcast.

4. Profile Information API

A new API has been added to retrieve a user’s profile information. This is useful for both the frontend (Felix) and backend services that need detailed user profile data.
### Endpoint

* URL: /users/profile-info/
* Method: GET
* Authorization: Requires a valid token.

### Headers

* Authorization:
```plaintext
    Authorization: Bearer <valid-jwt-token>
```
### Response

* Success:
```json
{
    "user_id": 123,
    "username": "johndoe",
    "nickname": "JohnD",
    "avatar": "/media/avatars/johnd.png",
    "bio": "Avid gamer and developer."
}
```
* Error:

- Missing or Invalid Token:
```json
{
    "error": "Authentication credentials were not provided."
}
```
- User Not Found:
```json
        {
            "error": "User not found."
        }
```
### Frontend Impact

* Can use this endpoint to fetch detailed profile information for rendering user data in the frontend.
* This eliminates the need for hardcoding user information or relying on static JSON files.

## Summary of Changes

1. Token Updates:
	* The token now includes user_id and nickname, reducing the need for additional API calls.

2. Tournament API:
	* A new API to create chat groups for tournaments.
	* Payload includes tournament_name and requires an authorization token.

4. Tournament Chat Communication:
	* WebSocket communication with tournament chat groups is supported.
	* Use the type functionality and tournament name in the payload to send messages.

5. Profile API:
	* Provides detailed user profile data (user_id, username, nickname, avatar, and bio).
	* Requires a valid token for access.

