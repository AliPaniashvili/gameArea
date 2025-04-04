const startButton = document.getElementById('startButton');
const player = document.getElementById('player');
const stone = document.getElementById('stone');
const gameArea = document.getElementById('gameArea');

let gameInterval;
let stoneFallSpeed = 5; // سرعت سقوط سنگ
let isGameActive = false;

startButton.addEventListener('click', startGame);

function startGame() {
    isGameActive = true;
    stone.style.top = '0px';
    stone.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
    startButton.disabled = true;

    gameInterval = setInterval(() => {
        moveStone();
    }, 100);
}

function moveStone() {
    const stoneTop = parseInt(stone.style.top);
    if (stoneTop < gameArea.clientHeight - 30) {
        stone.style.top = stoneTop + stoneFallSpeed + 'px';
    } else {
        // Reset stone position
        stone.style.top = '0px';
        stone.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
    }

    checkCollision();
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const stoneRect = stone.getBoundingClientRect();

    if (
        playerRect.left < stoneRect.right &&
        playerRect.right > stoneRect.left &&
        playerRect.top < stoneRect.bottom &&
        playerRect.bottom > stoneRect.top
    ) {
        alert('شما باختید!');
        clearInterval(gameInterval);
        startButton.disabled = false;
        isGameActive = false;
    }
}

document.addEventListener('mousemove', (event) => {
    if (isGameActive) {
        const gameAreaRect = gameArea.getBoundingClientRect();
        const mouseX = event.clientX - gameAreaRect.left;
        player.style.left = Math.min(Math.max(mouseX - 15, 0), gameArea.clientWidth - 30) + 'px'; // 15 به خاطر وسط قرارگیری
    }
});
