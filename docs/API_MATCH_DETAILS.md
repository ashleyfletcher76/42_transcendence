## Match Details Upload

### Purpose
The Tournament Lobby must call the match-history-service to upload match details, ensuring the user's match history and statistics (e.g., trophies, total games, wins, losses) are updated accurately.
### Endpoint Details
POST /match/add-match-history/

This endpoint allows the tournament lobby to send match details for a specific user.
### Request Format

The Tournament Lobby must send the following JSON payload for each match:
# Example 1: Tournament win
```json
{
	"user_id": 1,
    "opponent": "player2",
    "result": "win",
    "score": "15-10",
    "tournament_win": true
}
```
# Example 2: Regular match
```json
{
    "user_id": 1,
    "opponent": "player2",
    "result": "win",
    "score": "15-10",
}
```
### Fields Explanation:

1. user_id: (integer) The ID of the user for whom the match is being logged.
2. opponent: (string) The nickname of the opponent in the match.
3. result: (string) Either "win" or "loss" to indicate the match outcome.
4. score: (string) The final score of the match (e.g., "15-10").
5. tournament_win: (boolean, optional) Indicates whether this match resulted in a tournament victory. Default: false.

## A very rough example of how to call it
import requests

```python
def upload_match_details(user_id, opponent, result, score, tournament_win=False):
    url = "http://match-history-service:8000/match/add-match-history/"
    headers = {
        "Authorization": "Bearer <TOKEN>",  # Replace with the actual token
        "Content-Type": "application/json"
    }
    payload = {
        "user_id": user_id,
        "opponent": opponent,
        "result": result,
        "score": score,
        "tournament_win": tournament_win
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 201:
            return {"success": response.json()}
        else:
            return {"error": response.json()}
    except requests.RequestException as e:
        return {"error": f"Failed to connect to match-history-service: {str(e)}"}
```

### Response
Success (201 Created):
```json
{
    "message": "Match detail added and statistics updated successfully."
}
```
Error (400 or 500):

Example error responses:

* Missing required fields:
```json
{
    "error": "Missing required fields: 'opponent', 'result', or 'score'."
}
```
* User not found:
```json
{
    "error": "No match history found for this user."
}
```
* Server error:
```json
{
    "error": "Internal Server Error."
}
```
### How It Works

1. Payload Parsing: The match-history-service extracts the user_id and updates the respective MatchHistory and MatchDetail records.
2. Statistics Update:
    * games_total is incremented for each match.
    * wins or losses are incremented based on the result.
    * trophies are incremented if tournament_win is true.
3. Match Details Storage: A MatchDetail record is created for this match, storing information like opponent, result, and score.

## Important Notes

1. Authorization: The Authorization header must contain a valid token to authenticate the Tournament Lobby with the match-history-service.
2. Error Handling: The Tournament Lobby must handle 400 and 500 errors gracefully and retry or log failures as needed.
