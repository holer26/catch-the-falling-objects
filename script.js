// script.js

const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

let score = 0;
let lives = 3;
let basketPosition = 180; // Initial position of the basket
let fallingObjects = [];
let gameInterval;

// Move the basket left and right
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && basketPosition > 0) {
        basketPosition -= 20;
    } else if (event.key === 'ArrowRight' && basketPosition < 350) {
        basketPosition += 20;
    }
    basket.style.left = basketPosition + 'px';
});

// Create a new falling object
function createFallingObject() {
    const object = document.createElement('div');
    object.classList.add('falling-object');
    object.style.left = Math.random() * 370 + 'px'; // Random horizontal position
    object.style.top = '0px'; // Start from the top
    gameContainer.appendChild(object);
    fallingObjects.push(object);
}

// Move the falling objects down
function moveFallingObjects() {
    fallingObjects.forEach((object, index) => {
        let topPosition = parseInt(window.getComputedStyle(object).top);
        if (topPosition >= 570) {
            // Object missed
            object.remove();
            fallingObjects.splice(index, 1);
            lives--;
            updateLives();
            if (lives === 0) {
                endGame();
            }
        } else {
            topPosition += 5; // Speed of falling
            object.style.top = topPosition + 'px';

            // Check for collision with the basket
            if (
                topPosition >= 550 &&
                topPosition <= 570 &&
                parseInt(object.style.left) >= basketPosition - 15 &&
                parseInt(object.style.left) <= basketPosition + 35
            ) {
                object.remove();
                fallingObjects.splice(index, 1);
                score++;
                updateScore();
            }
        }
    });
}

// Update the score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Update the lives display
function updateLives() {
    livesDisplay.textContent = `Lives: ${lives}`;
}

// End the game
function endGame() {
    clearInterval(gameInterval);
    alert(`Game Over! Your final score is ${score}`);
    location.reload(); // Reload the page to restart the game
}

// Start the game loop
function startGame() {
    gameInterval = setInterval(() => {
        moveFallingObjects();
    }, 50);

    // Create new falling objects every second
    setInterval(createFallingObject, 1000);
}

startGame();