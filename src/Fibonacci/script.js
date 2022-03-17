class Fibonacci {
	constructor() {
		this.canvas = document.getElementById("Canvas");
		this.canvas.width = window.innerWidth - 10;
		this.canvas.height = window.innerHeight - 10;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.font = "30px Arial";
		this.ctx.textAlign = "center";

		this.lastNumber = 0;
		this.currentNumber = 1;
		this.sequence = [0];

		this.draw();
	}

	calcNextNumber() {
		const x = this.currentNumber + this.lastNumber;
		this.lastNumber = this.currentNumber;
		this.currentNumber = x;

		this.sequence.push(x);

		this.draw();
	}

	remove() {
		if (this.sequence.length > 1) {
			this.lastNumber = this.currentNumber - this.lastNumber;
			this.currentNumber = this.currentNumber - this.lastNumber;

			this.sequence.pop();
			this.draw();
		}
	}

	// -- Other methods
	// Calculate by the fibonacci sequence
	// The sequence before hit the max number
	calcSequenceUntilMax(max) {
		const sequence = [0];
		let lastNumber = 0;
		let currentNumber = 1;

		while (max > currentNumber) {
			const x = currentNumber + lastNumber;
			lastNumber = currentNumber;
			currentNumber = x;

			sequence.push(currentNumber);
		}

		return sequence;
	}

	// 
	calcSequenceByCycle(max) {
		let last = 0;
		let current = 1;
		const sequence = [0];

		for (let i = 2; i <= max; i++) {
			current = current + last;
			last = current - last;
			sequence.push(current);
		}

		return sequence;
	}

	// -- UI
	draw() {
		console.clear();
		console.log(this.sequence);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		const barWidth = this.canvas.width / this.sequence.length;
		for (let i = 0; i < this.sequence.length; i++) {
			const x = i * barWidth;
			const y = this.canvas.height - this.sequence[i] * this.canvas.height / this.sequence[this.sequence.length - 1];
			const width = barWidth;
			const height = this.sequence[i] * this.canvas.height / this.sequence[this.sequence.length - 1];
			const text = this.sequence[i];
			const fontSize = Math.floor(width / text.toString().length);
			this.ctx.font = `${fontSize}px Arial`;

			this.drawRect(x, y, width, height, this.randomColor());
			this.drawText(x + width / 2, y + (i === this.sequence.length - 1 ? height / 2 : 0), text, "white");
		}
	}

	drawRect(x, y, width, height, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, width, height);
	}

	drawText(x, y, text, color) {
		this.ctx.fillStyle = color;
		this.ctx.fillText(text, x, y);
	}

	randomColor() { return "#" + Math.floor(Math.random() * 16777215).toString(16); }
}

window.onload = () => {
	const f = new Fibonacci();
	document.getElementById("NextBTN")
		.addEventListener("click", async () => { f.calcNextNumber(); });

	document.getElementById("RemoveBTN")
		.addEventListener("click", async () => { f.remove(); });
};
