# TournamentActive API Documentation

## Endpoint
`POST /api/tournament-active/`

## Description
This endpoint allows users to manage their active games and tournaments by starting or ending them.

---

## Request Parameters
### Headers
- **Authorization**: `Bearer <token>` (Required)

### Body (JSON)
| Field           | Type     | Required | Description                                    |
|-----------------|----------|----------|------------------------------------------------|
| `action_type`   | `string` | Yes      | Action to perform: `start`, `end_game`, or `end_tournament` |
| `game_name`     | `string` | Conditional | Name of the game to start (required for `start` action)      |
| `tournament_name` | `string` | Conditional | Name of the tournament to start (required for `start` action) |

---

## Actions
### `start`
- Starts a new game or tournament.
- Requires either `game_name` or `tournament_name` in the request body.
- If an active game or tournament exists, an error will be returned.

### `end_game`
- Ends the active game for the user.
- Returns an error if no active game exists.

### `end_tournament`
- Ends the active tournament for the user.
- Returns an error if no active tournament exists.

---

## Responses
### Success Response
**Status Code**: `200 OK`
```json
{
    "success": true,
    "message": "<Action performed> completed successfully."
}
```

### Error Responses
#### Invalid `action_type`
**Status Code**: `400 Bad Request`
```json
{
    "error": "'action_type' must be 'start', 'end_game', or 'end_tournament'."
}
```

#### Active Game Exists
**Status Code**: `400 Bad Request`
```json
{
    "error": "A game is already active. Please end the current game before starting a new one."
}
```

#### Active Tournament Exists
**Status Code**: `400 Bad Request`
```json
{
    "error": "A tournament is already active. Please end the current tournament before starting a new one."
}
```

#### No Active Game/Tournament to End
**Status Code**: `400 Bad Request`
```json
{
    "error": "No active game to end."
}
```
OR
```json
{
    "error": "No active tournament to end."
}
```

---

## Example Requests
### Starting a Game
**Request**:
```json
{
    "action_type": "start",
    "game_name": "game_room"
}
```

**Response**:
```json
{
    "success": true,
    "message": "Start completed successfully."
}
```

### Ending a Game
**Request**:
```json
{
    "action_type": "end_game"
}
```

**Response**:
```json
{
    "success": true,
    "message": "End game completed successfully."
}
```

### Starting a Tournament
**Request**:
```json
{
    "action_type": "start",
    "tournament_name": "tournament_1"
}
```

**Response**:
```json
{
    "success": true,
    "message": "Start completed successfully."
}
```

### Ending a Tournament
**Request**:
```json
{
    "action_type": "end_tournament"
}
```

**Response**:
```json
{
    "success": true,
    "message": "End tournament completed successfully."
}
