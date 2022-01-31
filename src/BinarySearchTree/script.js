import BinarySearchTree from "./BinarySearchTree.js";

class App {
	constructor() {
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = window.innerWidth - 10;
		this.canvas.height = window.innerHeight - 10;
		this.tree = new BinarySearchTree();

		this.lastFoundValue = null;

		this.domBTNs();
		this.debug();
	}

	addNewValue(value) {
		this.tree.add(value);
		this.draw(this.tree.root);
	}

	search(value) {
		if (this.tree.search(value)) {
			this.lastFoundValue = value;
			this.draw(this.tree.root);
			return true;
		}
	}

	delete(value) {
		console.clear();
		this.tree.delete(value);
		this.draw(this.tree.root);
	}

	// ----- Canvas
	draw(root) {
		// console.clear();
		console.log(this.tree);

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.font = "20px Arial";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.drawNode(root, 0, 0, this.canvas.width, this.canvas.height / 4);
	}

	drawNode(node, x, y, width, height) {
		if (node === null) return;
		const isTheSmaller = this.tree.smaller().value === node.value;
		const isTheLarger = this.tree.larger().value === node.value;
		const isLastFoundNumber = this.lastFoundValue === node.value;

		// Box
		this.ctx.fillStyle = "black";
		if (isTheSmaller) this.ctx.strokeStyle = "green"; // Smaller
		else if (isTheLarger) this.ctx.strokeStyle = "red"; // Larger
		else if (isLastFoundNumber) this.ctx.strokeStyle = "blue"; // Last Number
		else this.ctx.strokeStyle = "white";
		this.ctx.beginPath();
		this.ctx.rect(x, y, width, height);
		this.ctx.fill();
		this.ctx.strokeRect(x, y, width, height);

		// Text
		if (isTheSmaller) this.ctx.fillStyle = "green"; // Smaller
		else if (isTheLarger) this.ctx.fillStyle = "red"; // Larger
		else if (isLastFoundNumber) this.ctx.fillStyle = "blue"; // Larger
		else this.ctx.fillStyle = "white";
		this.ctx.fillText(node.value, x + width / 2, y + height / 2);

		const newY = y + height;
		const newWidth = width / 2;
		const newHeight = height * 0.75;
		this.drawNode(node.left, x, newY, newWidth, newHeight);
		this.drawNode(node.right, x + newWidth, newY, newWidth, newHeight);
	}

	// ----- UI Interaction Buttons
	domBTNs() {
		// Add new Number
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

				this.addNewValue(Number(newValue));
			});

		// Search
		document.getElementById("FindValueBTN")
			.addEventListener("click", async () => {
				let inputValue = 0;
				const { value: newValue } = await Swal.fire({
					title: "Enter a value to find",
					input: "number",
					inputValue: inputValue,
					showCancelButton: true,
					inputValidator: (value) => {
						if (!value) {
							return "You need to write a number!"
						}
					}
				});

				const numberExists = !!this.search(Number(newValue));
				const message = numberExists ? "Yes, the number was found" : "Nop, there is no such number in the this.tree"
				const icon = numberExists ? "success" : "error";
				Swal.fire({
					title: message,
					icon,
				});
			});

		// Delete
		document.getElementById("DeleteValueBTN")
			.addEventListener("click", async () => {
				let inputValue = 0;
				const { value: newValue } = await Swal.fire({
					title: "Enter a value to find",
					input: "number",
					inputValue: inputValue,
					showCancelButton: true,
					inputValidator: (value) => {
						if (!value) {
							return "You need to write a number!"
						}
					}
				});

				const numberExists = !!this.delete(Number(newValue));
				// const message = numberExists ? "Yes, the number was found" : "Nop, there is no such number in the this.tree"
				// const icon = numberExists ? "success" : "error";
				// Swal.fire({
				// 	title: message,
				// 	icon,
				// });
			});
	}

	// Debug
	debug() {
		const URLParams = new URLSearchParams(window.location.search);
		if (!URLParams.get("debug")) return;

		for (let i = 0; i < 100; i++) {
			this.addNewValue(this.randomNumber(0, 100));
		}
		console.log(this.tree.search(50));
	}

	randomNumber(min, max) { return Math.round(Math.random() * (max - min) + min); }
}

window.onload = () => { new App(); }
