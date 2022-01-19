window.onload = () => {
	const notifier = new AWN({});
	notifier.info("Click to see magic");

	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	canvas.width = Math.floor(window.innerWidth) - 10;
	canvas.height = Math.floor(window.innerHeight) - 10;

	// Reset Canvas
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// A list of all next position to check in flood fill
	const stackFloodFill = [];

	let oldColor;
	canvas.addEventListener("click", (e) => {
		oldColor = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
		floodFill(e.offsetX, e.offsetY, oldColor, randomColor());
		update();
	});

	function randomColor() {
		return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
			Math.random() * 255
		)}, ${Math.floor(Math.random() * 255)})`;
	}

	function update() {
		setInterval(() => {
			if (stackFloodFill.length > 0) {
				const { x, y, oldColor, newColor } = stackFloodFill[0];
				floodFill(x, y, oldColor, newColor);
				stackFloodFill.shift();
			}
		}, 0);

		// requestAnimationFrame(update);
	}

	function floodFill(x, y, oldColor, newColor) {
		if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) return;
		if (
			ctx.getImageData(x, y, 1, 1).data[0] === oldColor[0] &&
			ctx.getImageData(x, y, 1, 1).data[1] === oldColor[1] &&
			ctx.getImageData(x, y, 1, 1).data[2] === oldColor[2]
		) {
			paintSquare(x, y, newColor);
			stackFloodFill.push(
				{ x: x + 1, y: y, oldColor, newColor },
				{ x: x - 1, y: y, oldColor, newColor },
				{ x: x, y: y + 1, oldColor, newColor },
				{ x: x, y: y - 1, oldColor, newColor }
			);
		}
	}

	function paintSquare(x, y, color) {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, 1, 1);
	}
}
