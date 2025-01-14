
1. Game Management

## Start Game
## Payload:
{
    "action": "start",
    "game_name": "game_room"
}
## Description:
This action updates the game_name for the user.
If the user already has an active game_name, an error will be sent indicating that the user is already in a game.

## If the user already has a game_name, return an error message:
{
    "error": "User already has an active game"
}

## End Game
## Payload:

{
    "action": "end"
}
## Description:
    This action deletes the game_name for the user, indicating that the game has ended.


2. Tournament Management


# Start Tournament
# Payload:

{
    "action": "start",
    "tournament_name": "tournament_name"
}

# Description:
This action updates the tournament_name for the user.
If the user already has an active tournament_name, an error will be sent indicating that the user is already in a tournament.

# If the user already has a tournament_name, return an error message: 

{
    "error": "User already has an active tournament"
}

# End Tournament
{
    "action": "end_tournament"
}

# Description:
This action deletes the tournament_name for the user, indicating that the tournament has ended.1