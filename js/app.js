/* Classic arcade game based on frogger. Udacity/Google Scholarship object-oriented JS project */

/* DOM elements */
const winScreen = document.getElementById('winScreen');
const loseScreen = document.getElementById('loseScreen');

/* Random int generator for updating enemy position & speed
 from StackOverflow: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range */
const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Setting random positioning helper functions */

// Possible vertical positioning
const positionY = {
	topRow: 68,
	midRow: 151,
	bottomRow: 234
}

const getRandomRow = () => {
	const rand = getRandomInt(1, 3);
	return this.y = rand === 1 ? positionY.topRow : (rand === 2 ? positionY.midRow : positionY.bottomRow);
}

const getRandomOffset = () => {
	return getRandomInt(-100, -400);
}

const getRandomSpeed = () => {
	return getRandomInt(150, 500);
}

// Enemies our player must avoid
const Enemy = function(x, y, speed) {
	this.x = x;
	this.y = y;
	this.speed = speed;

	// The image/sprite for our enemies, this uses
	// a helper provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// dt parameter multiplication
	// ensures the game runs at the same speed for
	// all computers.

	// move enemy at its speed
	this.x = this.x + this.speed * dt;

	// get new random enemy position after it goes off screen
	if (this.x > 500) {
		this.x = getRandomOffset();
		this.y = getRandomRow();
		this.speed = getRandomSpeed();
	}
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Defines player class
const Player = function() {
	this.x = 0;
	this.y = 400;
	this.sprite = 'images/char-cat-girl.png';
};

// Check for collisions
const checkCollisions = () => {
	allEnemies.forEach(enemy => {
		if (enemy.y === player.y) {
			if ((Math.abs(enemy.x - player.x)) < 80) {
				allEnemies.forEach(enemy => enemy.speed = 0);
				loseScreen.style.display = 'block';
			}
		}
	});
}

Player.prototype.update = function() {
	checkCollisions();
};

// Render player avatar
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update player position on arrow keys input & check for win
const checkWin = () => {
	if (player.y < 68) {
		allEnemies.forEach(enemy => {
			allEnemies.forEach(enemy => enemy.speed = 0);
			winScreen.style.display = 'block';
		});
	}
};

Player.prototype.handleInput = function(key) {
	switch (key) {
		case 'left':
			this.x = this.x - 101;
			break;
		case 'right':
			this.x = this.x + 101;
			break;
		case 'up':
			this.y = this.y - 83;
			break;
		case 'down':
			this.y = this.y + 83;
			break;
	}

	checkWin();

	if (this.x < 0) {
		this.x = 0;
	} else if (this.x > 404) {
		this.x = 404;
	}

	if (this.y < -25) {
		this.y = -25;
	} else if (this.y > 400) {
		this.y = 400;
	}
};

// Instantiate game objects.
const allEnemies = [
	new Enemy(getRandomOffset(), getRandomRow(), getRandomSpeed()),
	new Enemy(getRandomOffset(), getRandomRow(), getRandomSpeed()),
	new Enemy(getRandomOffset(), getRandomRow(), getRandomSpeed()),
	new Enemy(getRandomOffset(), getRandomRow(), getRandomSpeed())
];

const player = new Player();

// Listener for Player.handleInput() method.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
