import json
import asyncio
import random
import math
from channels.generic.websocket import AsyncWebsocketConsumer

# Game constants
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 400
BALL_RADIUS = 10
PADDLE_WIDTH = 10
PADDLE_HEIGHT = 100

class GameConsumer(AsyncWebsocketConsumer):
    game_state = {
        'ball_x': 0.5,
        'ball_y': 0.5,
        'ball_speed_x': random.choice([0.0005, -0.0005]),
        'ball_speed_y': random.choice([0.005, -0.0005]),
        'left_paddle_y': 0.5,
        'right_paddle_y': 0.5,
        'left_score': 0,
        'right_score': 0
    }

    async def connect(self):
        """When a WebSocket connection is opened."""
        self.room_group_name = "pong_game"  # Group name for all WebSocket clients in the game

        # Join the group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
    
        await self.accept()
    
        # Start the game loop
        asyncio.create_task(self.game_loop())

        # Send a welcome message to the client
        await self.send(text_data=json.dumps({
            "message": "Welcome to the Pong Game!"
        }))

    async def disconnect(self, close_code):
        """When the WebSocket is closed."""
        # Leave the group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        """When a message is received from WebSocket (client sends a message)."""
        data = json.loads(text_data)

        # Handle different message types
        if data['type'] == 'paddle_move':
            # Update the paddle position
            await self.update_paddle(data['player'], data['y'])

        elif data['type'] == 'game_update':
            # Send the game state to all players
            await self.send_game_state()

    async def update_paddle(self, player, y):
        """Update paddle position for a specific player."""
        if player == "left":
            self.game_state['left_paddle_y'] = y
        elif player == "right":
            self.game_state['right_paddle_y'] = y

        # Send updated game state
        await self.send_game_state()

    async def send_game_state(self):
        """Send the updated game state to all players."""
        game_state = {
            'ball_x': self.game_state['ball_x'],
            'ball_y': self.game_state['ball_y'],
            'left_paddle_y': self.game_state['left_paddle_y'],
            'right_paddle_y': self.game_state['right_paddle_y'],
            'left_score': self.game_state['left_score'],
            'right_score': self.game_state['right_score']
        }

        # Broadcast the game state to all players in the room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_state_update',
                'game_state': game_state
            }
        )

    async def game_state_update(self, event):
        """Handle sending game state to the client."""
        await self.send(text_data=json.dumps({
            'game_state': event['game_state']
        }))

    async def game_loop(self):
        """Main game loop: update ball movement, check for collisions, etc."""
        while True:
            await self.move_ball()

            # Update AI if necessary (in this case, simple right paddle AI)
            self.update_ai()

            # Send the updated game state to all clients
            await self.send_game_state()

            # Delay to simulate real-time updates (60 FPS)
            await asyncio.sleep(1)  # ~60 FPS

    async def move_ball(self):
        """Move the ball and handle collisions."""
        self.game_state['ball_x'] += self.game_state['ball_speed_x']
        self.game_state['ball_y'] += self.game_state['ball_speed_y']

        # Bounce off the top and bottom walls
        if self.game_state['ball_y'] <= 0 or self.game_state['ball_y'] >= 1:
            self.game_state['ball_speed_y'] = -self.game_state['ball_speed_y']

        # Left paddle collision
        if self.game_state['ball_x'] <= 0.08:
            if self.game_state['left_paddle_y'] - 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT <= self.game_state['ball_y'] <= self.game_state['left_paddle_y'] + 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT:
                await self.handle_paddle_hit("left")

        # Right paddle collision
        if self.game_state['ball_x'] >= 0.92:
            if self.game_state['right_paddle_y'] - 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT <= self.game_state['ball_y'] <= self.game_state['right_paddle_y'] + 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT:
                await self.handle_paddle_hit("right")

        # Scoring conditions
        if self.game_state['ball_x'] <= 0:
            self.game_state['right_score'] += 1
            self.reset_ball()
        elif self.game_state['ball_x'] >= 1:
            self.game_state['left_score'] += 1
            self.reset_ball()

    async def handle_paddle_hit(self, paddle_side):
        """Handle a paddle hit and adjust ball angle."""
        if paddle_side == "left":
            paddle_center = self.game_state['left_paddle_y'] * SCREEN_HEIGHT
        elif paddle_side == "right":
            paddle_center = self.game_state['right_paddle_y'] * SCREEN_HEIGHT

        # Calculate hit position relative to the paddle's center
        hit_position = paddle_center - (self.game_state['ball_y'] * SCREEN_HEIGHT)

        # Calculate angle based on hit position
        angle_factor = hit_position / (PADDLE_HEIGHT / 2)  # Normalize to [-1, 1]
        angle = angle_factor * (math.pi / 3)  # Max angle of 60 degrees

        self.game_state['ball_speed_x'] = -self.game_state['ball_speed_x']  # Reverse X direction
        self.game_state['ball_speed_y'] = math.sin(angle) * 0.005  # Set new Y speed based on angle

        # Increase ball speed (acceleration)
        self.game_state['ball_speed_x'] *= 1.1
        self.game_state['ball_speed_y'] *= 1.1

    def reset_ball(self):
        """Reset the ball to the center of the screen."""
        self.game_state['ball_x'] = 0.5
        self.game_state['ball_y'] = 0.5
        self.game_state['ball_speed_x'] = random.choice([0.005, -0.005])
        self.game_state['ball_speed_y'] = random.choice([0.005, -0.005])

    def update_ai(self):
        """Update the AI for the right paddle to follow the ball."""
        if self.game_state['ball_y'] < self.game_state['right_paddle_y'] - 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT:
            self.move_right_paddle(-1)
        elif self.game_state['ball_y'] > self.game_state['right_paddle_y'] + 0.5 * PADDLE_HEIGHT / SCREEN_HEIGHT:
            self.move_right_paddle(1)

    def move_right_paddle(self, direction):
        """Move the right paddle."""
        self.game_state['right_paddle_y'] += direction * 0.01
        # Keep paddle within bounds
        self.game_state['right_paddle_y'] = max(0.10, min(0.90, self.game_state['right_paddle_y']))

    def move_left_paddle(self, direction):
        """Move the left paddle."""
        self.game_state['left_paddle_y'] += direction * 0.01
        # Keep paddle within bounds
        self.game_state['left_paddle_y'] = max(0.10, min(0.90, self.game_state['left_paddle_y']))
