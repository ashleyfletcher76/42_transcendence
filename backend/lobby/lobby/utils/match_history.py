import requests

def upload_match_details(user_id, opponent, result, score):
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
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 201:
            return {"success": response.json()}
        else:
            return {"error": response.json()}
    except requests.RequestException as e:
        return {"error": f"Failed to connect to match-history-service: {str(e)}"}