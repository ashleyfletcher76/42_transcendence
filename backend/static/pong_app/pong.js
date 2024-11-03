const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

let gameState = {
    ball_x: 0.5,
    ball_y: 0.5,
    left_paddle_y: 0.5,
    right_paddle_y: 0.5,
    left_score: 0,
    right_score: 0
};

// Function to draw the game state
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ballX = gameState.ball_x * canvas.width;
    const ballY = gameState.ball_y * canvas.height;
    const paddleHeight = 80;
    const paddleWidth = 10;

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    // Draw left paddle
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(0, gameState.left_paddle_y * canvas.height - paddleHeight / 2, paddleWidth, paddleHeight);

    // Draw right paddle
    ctx.fillRect(canvas.width - paddleWidth, gameState.right_paddle_y * canvas.height - paddleHeight / 2, paddleWidth, paddleHeight);

    // Draw scores
    ctx.font = "24px Arial";
    ctx.fillText(`Left: ${gameState.left_score}`, 20, 30);
    ctx.fillText(`Right: ${gameState.right_score}`, canvas.width - 120, 30);
}

// Function to fetch the game state from the server
async function fetchGameState() {
    try {
        const response = await fetch('http://127.0.0.1:8000/pong/pong/game/');
        if (response.ok) {
            const data = await response.json();
            gameState = data;
            drawGame();
        }
    } catch (error) {
        console.error("Error fetching game state:", error);
    }
}

// Function to update the game state on the server (move ball)
async function updateGameState() {
    try {
        await fetch('http://127.0.0.1:8000/pong/pong/game/', {
            method: 'POST'
        });
        fetchGameState();
    } catch (error) {
        console.error("Error updating game state:", error);
    }
}

// Function to handle user input
function handleUserInput(event) {
    const paddleSpeed = 0.05;
    if (event.key === 'ArrowUp') {
        gameState.right_paddle_y = Math.max(0, gameState.right_paddle_y - paddleSpeed);
    } else if (event.key === 'ArrowDown') {
        gameState.right_paddle_y = Math.min(1, gameState.right_paddle_y + paddleSpeed);
    }
    updateGameState();
}

// Set up the game loop
setInterval(() => {
    updateGameState();
}, 1000 / 60);

// Event listener for user input
document.addEventListener('keydown', handleUserInput);

// Fetch initial game state
fetchGameState();