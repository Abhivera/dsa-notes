class Node {
    constructor(value){
        this.value = value
        this.next = null
        this.prev = null
    }
}
class DoublyLinkedList {
    constructor(){
        this.head = null
        this.tail = null
    }
    getNode(index){
        if (index <0)
        {return null}
        let count = 0
        let current = this.head
        while(current && count<index){
           current = current.next
           count++
        }
        return current 
    }
    insertAtEnd(value){
        let newnode = new Node(value)
        if(!this.head){
            this.head = newnode
            this.tail = newnode 
             }
        else {
            this.tail.next = newnode
            this.tail=newnode
        }
         }
    removeAtIndex(index){
        if(index<0||!this.head){
            return null
        }
        
        if(index==0){
            let removedNode = this.head
            this.head = this.head.next
            if(this.head){
                this.head.prev = null
            }
            else {
                this.tail = null
            }
            
            return removedNode
        }
        let count = 0;
        let current = this.head;
        while(current && count<index-1){
            current = current.next
            count++
        }
        let removeNode = current.next 
        current.next=current.next.next
        if(current.next){
            current.next.prev = current
        }
        else {
            this.tail = current 
        }
        return removeNode
        
    }
    getLength(){
        let current = this.head
        let count = 0
        while(current){
            current = current.next
            count++
             }
        return count
    }
}
// Test the code
let list = new DoublyLinkedList();
list.insertAtEnd(1);
list.insertAtEnd(2);
list.insertAtEnd(3);

console.log("List length:", list.getLength()); // List length: 3

console.log("Node at index 1:", list.getNode(1).value); // Node at index 1: 2

console.log("Remove node at index 1:", list.removeAtIndex(1)); // Remove node at index 1: 2

console.log("Node at index 1 after removal:", list.getNode(1).value); // Node at index 1 after removal: 3

console.log("List length after removal:", list.getLength());