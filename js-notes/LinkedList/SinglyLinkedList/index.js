class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    getNode(index) {
        if (index < 0) {
            return null;
        }
        let count = 0;
        let current = this.head;
        while (current && count < index) {
            current = current.next;
            count++;
        }
        return current;
    }

    insertAtEnd(value) {
        let newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    insertAtIndex(index, value) {
        if (index < 0) {
            return null;
        }

        let newNode = new Node(value);

        // Insert at the head
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
            if (!this.tail) {
                this.tail = newNode;
            }
            return;
        }

        // Insert at the correct position
        let current = this.head;
        let count = 0;

        while (current && count < index - 1) {
            current = current.next;
            count++;
        }

        // If current is null, the index is out of bounds
        if (!current) {
            return null;
        }

        newNode.next = current.next;
        current.next = newNode;

        // Update the tail if inserted at the end
        if (newNode.next === null) {
            this.tail = newNode;
        }
    }

    removeAtIndex(index) {
        if (index < 0 || this.head === null) {
            return null;
        }

        // Removing the head node
        if (index === 0) {
            let removedNode = this.head;
            this.head = this.head.next;
            if (this.head === null) {
                this.tail = null;
            }
            return removedNode.value;
        }

        let count = 0;
        let current = this.head;

        // Traverse to the node before the one to be removed
        while (current && count < index - 1) {
            current = current.next;
            count++;
        }

        // If current is null or the next node is null, the index is out of bounds
        if (!current || !current.next) {
            return null;
        }

        let removedNode = current.next;
        current.next = current.next.next;

        // Update the tail if the removed node was the tail
        if (removedNode === this.tail) {
            this.tail = current;
        }

        return removedNode.value;
    }

    getLength() {
        let current = this.head;
        let count = 0;
        while (current) {
            current = current.next;
            count++;
        }
        return count;
    }
}

// Test the code
let list = new SinglyLinkedList();
list.insertAtEnd(1);  // Insert 1 at the end
list.insertAtEnd(3);  // Insert 3 at the end
list.insertAtEnd(4);  // Insert 4 at the end

console.log("Initial list length:", list.getLength()); // Initial list length: 3

list.insertAtIndex(1, 2); // Insert 2 at index 1

console.log("Node at index 1 after insertion:", list.getNode(1).value); // Node at index 1 after insertion: 2

console.log("List length after insertion:", list.getLength()); // List length after insertion: 4

list.removeAtIndex(2); // Remove node at index 2

console.log("Node at index 2 after removal:", list.getNode(2).value); // Node at index 2 after removal: 4

console.log("List length after removal:", list.getLength()); // List length after removal: 3
