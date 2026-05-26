class Stack{
    constructor(){
        this.items =[]
    }
    push(element){
        this.items[this.items.length]=element;
    }
    pop(){
           if (this.isEmpty()) {
      return "Stack is empty";
    }
        const topElement = this.items[this.items.length - 1];
    this.items.length = this.items.length - 1;  // Decrease length to remove the last element
    return topElement;
    }
    isEmpty(){
        return this.items.length==0;
    }
    size(){
        return this.items.length;
    }
      printStack() {
    console.log(this.items.join(" "));
  }
   peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }
    
}
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.pop()); // Output: 30
console.log(stack.peek()); // Output: 20
console.log(stack.isEmpty()); // Output: false
console.log(stack.size()); 