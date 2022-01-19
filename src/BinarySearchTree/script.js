const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null;
		this.count = 0;
	}

	size() {
		return this.count;
	}

	add(value) {
		if (typeof value !== "number") {
			console.error("Value need to be a number!");
			return;
		}

		const node = new Node(value);

		if (this.root === null) {
			this.count++;
			this.root = node;
			this.draw();
			return;
		}

		let current = this.root;
		while (current) {
			if (value === current.value) return; // Same Value
			else if (current.value > value) { // Left
				if (current.left === null) { // Empty
					current.left = node;
					this.count++;
					break;
				} else current = current.left;

			} else { // Right
				if (current.right === null) { // Empty
					current.right = node;
					this.count++;
					break;
				} else current = current.right;
			}
		}

		this.draw();
	}

	smaller() {
		let current = this.root;
		do {
			if (current.left === null) { // No more Smaller number
				return current.value;
			} else {
				current = current.left;
			}
		} while (current);
	}
	larger() {
		let current = this.root;
		do {
			if (current.right === null) { // No more Larger number
				return current.value;
			} else {
				current = current.right;
			}
		} while (current);
	}
	search(value) { } // TODO
	delete(value) { } // TODO


	// -------------------------------- Draw Methods
	draw() {
		console.clear();
		console.log(this);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.font = "20px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		this.drawNode(this.root, 0, 0, canvas.width, canvas.height / 4);
	}

	drawNode(node, x, y, width, height) {
		if (node === null) return;
		const isTheSmaller = this.smaller() === node.value;
		const isTheLarger = this.larger() === node.value;

		// Box
		ctx.fillStyle = "black";
		if (isTheSmaller) ctx.strokeStyle = "green"; // Smaller
		else if (isTheLarger) ctx.strokeStyle = "red"; // Larger
		else ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.fill();
		ctx.strokeRect(x, y, width, height);

		// Text
		if (isTheSmaller) ctx.fillStyle = "green"; // Smaller
		else if (isTheLarger) ctx.fillStyle = "red"; // Larger
		else ctx.fillStyle = "white";
		ctx.fillText(node.value, x + width / 2, y + height / 2);

		const newY = y + height;
		const newWidth = width / 2;
		const newHeight = height * 0.75;
		this.drawNode(node.left, x, newY, newWidth, newHeight);
		this.drawNode(node.right, x + newWidth, newY, newWidth, newHeight);
	}
}
const tree = new BinarySearchTree();

// Interaction Buttons
document.getElementById("AddNewValueBTN")
	.addEventListener("click", async () => {
		let inputValue = 0;
		const { value: newValue } = await Swal.fire({
			title: "Enter a new value",
			input: "number",
			inputValue: inputValue,
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return "You need to write a number!"
				}
			}
		});

		tree.add(Number(newValue));
	});

// Debug
// function randomNumber(min, max) { return Math.round(Math.random() * (max - min) + min); }
// for (let i = 0; i < 100; i++) tree.add(randomNumber(0, 100)); 
