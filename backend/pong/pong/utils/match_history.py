import requests
import httpx


def upload_match_details(user, user_id, opponent, result, score, token):
    url = "http://match-history-service:8000/match/add-match-history/"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    payload = {
        "user_id": user_id,
        "opponent": opponent,
        "result": result,
        "score": score,
    }
    print(f"{user} send this payload = {payload}")

    try:
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 201:
            return {"success": response.json()}
        else:
            return {"error": response.json()}
    except requests.RequestException as e:
        return {"error": f"Failed to connect to match-history-service: {str(e)}"}

async def end_game(token):
    try:
        print("end game info send")
        url = "http://user-service:8000/users/tournament-active/"
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        payload = {
            "action_type": "end_game"
        }
        async with httpx.AsyncClient() as client:
            response = await client.post( url, headers=headers, json=payload )
        if response.status_code == 200:
            print(response.json)
            return response.json()
        elif response.status_code == 404:
            return {"error": "Endpoint not found"}
        else:
            print(f"Request failed with status {response.status_code}: {response.text}")
            return {"error": f"Request failed with status {response.status_code}"}
    except httpx.RequestError as e:
        print(f"HTTP request error: {str(e)}")
        return {"error": "HTTP request failed"}
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return {"error": "An unexpected error occurred"}