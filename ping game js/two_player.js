// two players simultaneously play js 
// Game variables
let gameState = 'start';
let paddle_1 = document.querySelector('.paddle_1');
let paddle_2 = document.querySelector('.paddle_2');
let board = document.querySelector('.board');
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball');
const WINNING_SCORE = 3;
var player1 = 0;
var player2 = 0;
// Set initial position and speed of the ball
let score_1 = document.querySelector('.player_1_score');
let score_2 = document.querySelector('.player_2_score');
let message = document.querySelector('.message');
let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;
let board_coord = board.getBoundingClientRect();
let paddle_common =
	document.querySelector('.paddle').getBoundingClientRect();
var show = false;
let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

document.addEventListener('keydown', (e) => {
	if (e.key == 'Enter') {
		gameState = gameState == 'start' ? 'play' : 'start';
		if (gameState == 'play') {
			message.innerHTML = 'Game Started';
			message.style.left = 42 + 'vw';
			requestAnimationFrame(() => {
				dx = Math.floor(Math.random() * 4) + 3;
				dy = Math.floor(Math.random() * 4) + 3;
				dxd = Math.floor(Math.random() * 2);
				dyd = Math.floor(Math.random() * 2);
				moveBall(dx, dy, dxd, dyd);
			});
		}
	}
	if (gameState == 'play') {
		if (e.key == 'w') {
			paddle_1.style.top =
				Math.max(
					board_coord.top,
					paddle_1_coord.top - window.innerHeight * 0.06
				) + 'px';
			paddle_1_coord = paddle_1.getBoundingClientRect();
		}
		if (e.key == 's') {
			paddle_1.style.top =
				Math.min(
					board_coord.bottom - paddle_common.height,
					paddle_1_coord.top + window.innerHeight * 0.06
				) + 'px';
			paddle_1_coord = paddle_1.getBoundingClientRect();
		}

		if (e.key == 'ArrowUp') {
			paddle_2.style.top =
				Math.max(
					board_coord.top,
					paddle_2_coord.top - window.innerHeight * 0.1
				) + 'px';
			paddle_2_coord = paddle_2.getBoundingClientRect();
		}
		if (e.key == 'ArrowDown') {
			paddle_2.style.top =
				Math.min(
					board_coord.bottom - paddle_common.height,
					paddle_2_coord.top + window.innerHeight * 0.1
				) + 'px';
			paddle_2_coord = paddle_2.getBoundingClientRect();
		}
	}
});
// Update ball position
function moveBall(dx, dy, dxd, dyd) {
	if (ball_coord.top <= board_coord.top) {
		dyd = 1;
	}
	if (ball_coord.bottom >= board_coord.bottom) {
		dyd = 0;
	}
	// Check if the ball hits the paddle
	if (
		ball_coord.left <= paddle_1_coord.right &&
		ball_coord.top >= paddle_1_coord.top &&
		ball_coord.bottom <= paddle_1_coord.bottom
	) {
		player1 = +player1 + 1;
		dxd = 1;
		dx = Math.floor(Math.random() * 4) + 3;
		dy = Math.floor(Math.random() * 4) + 3;
	}
	if (
		ball_coord.right >= paddle_2_coord.left &&
		ball_coord.top >= paddle_2_coord.top &&
		ball_coord.bottom <= paddle_2_coord.bottom
	) {
		player2 = +player2 + 1;
		dxd = 0;
		dx = Math.floor(Math.random() * 4) + 3;
		dy = Math.floor(Math.random() * 4) + 3;
	}
	// Check if the ball misses the paddle
	if (
		ball_coord.left <= board_coord.left ||
		ball_coord.right >= board_coord.right
	) {
		if (ball_coord.left <= board_coord.left) {
			score_2.innerHTML = +score_2.innerHTML + 1;

			resetBall();
		} else {
			score_1.innerHTML = +score_1.innerHTML + 1;

			resetBall();
		}

		if (score_1.innerHTML >= WINNING_SCORE) {
			alert("Game over! Player one win with score: " + player1)
			resetGame();
		}
		else if (score_2.innerHTML >= WINNING_SCORE) {
			alert("Game over!Player two win with score: " + player2)
			resetGame();
		}
		return;
	}
	ball.style.top = ball_coord.top + dy * (dyd == 0 ? -1 : 1) + 'px';
	ball.style.left = ball_coord.left + dx * (dxd == 0 ? -1 : 1) + 'px';
	ball_coord = ball.getBoundingClientRect();
	requestAnimationFrame(() => {
		moveBall(dx, dy, dxd, dyd);
	});
}

// Reset ball position and speed
function resetBall() {
	gameState = 'start';
	ball_coord = initial_ball_coord;
	ball.style = initial_ball.style;
	message.innerHTML = 'Press Enter to Play Pong';
	message.style.left = 38 + 'vw';

}

// Reset game
function resetGame() {
	score_2.innerHTML = 0;
	score_1.innerHTML = 0;
	player1 = 0;
	player2 = 0;
	resetBall();
}
moveBall(dx, dy, dxd, dyd);  