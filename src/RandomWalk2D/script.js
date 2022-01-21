class Cell {
	constructor(x, y, tilledSize) {
		this.x = x;
		this.y = y;
		this.tilledSize = tilledSize;
		this.countStepped = 1;
		this.color = "#00ff00";
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.tilledSize, this.tilledSize);
	}
}

class Player {
	constructor(tilledSize, boundX, boundY) {
		this.x = boundX / 2;
		this.y = boundY / 2;
		this.tilledSize = tilledSize;
		this.boundX = boundX;
		this.boundY = boundY;
		this.steppes = 0;

		this.color = "#ff0000";
	}

	moveUp() {
		if (this.y > 0) {
			this.y -= this.tilledSize;
		}
	}
	moveDown() {
		if (this.y + this.tilledSize < this.boundY) {
			this.y += this.tilledSize;
		}
	}
	moveLeft() {
		if (this.x > 0) {
			this.x -= this.tilledSize;
		}
	}
	moveRight() {
		if (this.x + this.tilledSize < this.boundX) {
			this.x += this.tilledSize;
		}
	}

	update(rn) {
		switch (rn) {
			case 0: // Up
				this.moveUp();
				break;

			case 1: // Down
				this.moveDown();
				break;

			case 2: // Left
				this.moveLeft();
				break;

			case 3: // Right
				this.moveRight();
				break;
		}

		this.steppes++;
		return { x: this.x, y: this.y };
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.tilledSize, this.tilledSize);
	}
}

class Game {
	constructor() {
		this.canvas = document.getElementById("Canvas");
		this.ctx = this.canvas.getContext("2d");

		this.tilledSize = 20;
		// Calculate the best size of the canvas based on the tile size
		this.canvasWidth = Math.floor((window.innerWidth - 10) / this.tilledSize) * this.tilledSize;
		this.canvasHeight = Math.floor((window.innerHeight - 10) / this.tilledSize) * this.tilledSize;

		this.canvas.width = this.canvasWidth;
		this.canvas.height = this.canvasHeight;

		this.rows = Math.round(this.canvasWidth / this.tilledSize);
		this.columns = Math.round(this.canvasHeight / this.tilledSize);;
		this.trail = [];

		this.player = new Player(
			this.tilledSize,
			this.rows * this.tilledSize,
			this.columns * this.tilledSize
		);

		this.update();
	}

	updateTrail(currentPosition) {
		const cell = this.trail.filter(c => {
			if (c.x === currentPosition.x && c.y === currentPosition.y) return c;
		})[0];

		if (!cell) {
			this.trail.push(new Cell(currentPosition.x, currentPosition.y, this.tilledSize));
		} else {
			cell.countStepped++;
		}

		this.sortTrailByCountStepped();
		this.updateCellColor();
	}

	sortTrailByCountStepped() {
		this.trail = this.trail.sort((a, b) => a.countStepped - b.countStepped);
	}

	updateCellColor() {
		const colorSteep = 255 / this.trail.length;
		for (let i = 0; i < this.trail.length; i++) {
			const color = colorSteep * (i + 1);
			this.trail[i].color = `rgb(0, ${color}, 0)`;
		}
	}

	update() {
		const currentPosition = this.player.update(this.randomNumber());
		this.updateTrail(currentPosition);

		this.render();
		requestAnimationFrame(this.update.bind(this));
	}

	render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.trail.forEach(cell => cell.render(this.ctx));
		this.player.render(this.ctx);
	}

	randomNumber(min = 0, max = 3) { return Math.floor(Math.random() * (max - min + 1) + min); }
	randomColor() { return "#" + (Math.random() * 0xFFFFFF << 0).toString(16); }
}

window.onload = () => {
	new Game();
}
