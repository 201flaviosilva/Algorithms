export class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

export default class BinarySearchTree {
	constructor() {
		this.root = null;
		this.count = 0;
	}

	size() {
		return this.count;
	}

	add(value) {
		if (typeof value !== "number" || isNaN(value)) {
			console.error("Value need to be a number!");
			return;
		}

		const node = new Node(value);

		if (this.root === null) {
			this.count++;
			this.root = node;
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

		console.log(this);
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

	search(value) {
		if (typeof value !== "number") {
			console.error("Value need to be a number!");
			return false;
		}

		let current = this.root;
		while (current) {
			if (value === current.value) return true; // Same Value

			else if (current.value > value) { // Left
				if (current.left === null) return false; // There is no smaller number
				else current = current.left;

			} else { // Right
				if (current.right === null) return false; // There is no greater number
				else current = current.right;
			}
		}
	}

	delete(value) { } // TODO
}

export const BinarySearchTreeInstance = new BinarySearchTree();
