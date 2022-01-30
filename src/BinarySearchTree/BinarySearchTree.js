export class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
		this.parent = null;
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
					node.parent = current;
					current.left = node;
					this.count++;
					break;
				} else current = current.left;

			} else { // Right
				if (current.right === null) { // Empty
					node.parent = current;
					current.right = node;
					this.count++;
					break;
				} else current = current.right;
			}
		}

		console.log(this);
	}

	smaller(value) {
		if (!this.root) return;
		let current = this.search(value || this.root.value);
		do {
			if (current.left === null) { // No more Smaller number
				return current;
			} else {
				current = current.left;
			}
		} while (current);
	}

	larger(value) {
		if (!this.root) return;
		let current = this.search(value || this.root.value);
		do {
			if (current.right === null) { // No more Larger number
				return current;
			} else {
				current = current.right;
			}
		} while (current);
	}

	// Returns false if the number does not exist or if there is an error
	// If the number exists, return its node
	search(value) {
		if (typeof value !== "number") {
			console.error("Value need to be a number!");
			return false;
		}

		let current = this.root;
		while (current) {
			if (value === current.value) return current; // Same Value

			else if (current.value > value) { // Left
				if (current.left === null) return false; // There is no smaller number
				else current = current.left;

			} else { // Right
				if (current.right === null) return false; // There is no greater number
				else current = current.right;
			}
		}
	}

	delete(value) {
		const node = this.search(value);
		if (!node) return false;

		console.log(node);
		if (node.left === null && node.right === null) { // No child
			if (node.parent.left.value === node.value) {
				node.parent.left = null;
			} else {
				node.parent.right = null;
			}

		} else if ((node.left !== null && node.right === null) || (node.left === null && node.right !== null)) { // One Child
			const fixChildNode = node.left || node.right;
			fixChildNode.parent = node.parent;
			if (node.parent.left.value === node.value) {
				node.parent.left = fixChildNode;
			} else {
				node.parent.right = fixChildNode;
			}

		} else if (node.left !== null && node.right !== null) { // Two children
			let currentNode = node.right;
			currentNode = this.smaller(currentNode.value);
			node.value = currentNode.value;
			currentNode.parent.left = null;

			console.log(currentNode);

		} else { // Error
			console.error("Error deleting value");
		}
		console.log(node, this.search(value));
	}
}

export const BinarySearchTreeInstance = new BinarySearchTree();
