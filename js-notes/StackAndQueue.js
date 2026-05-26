class Node {
    constructure(value){
        this.value = value;
        this.next = null;
    }
}
class Stack{
 constructor(){
this.top = null;
this.size=0;
    }
push(value){
    const newNode = new Node(value);
    if(this.top ===null){
        this.top = newNode;
        }
        else {
            newNode.next = this.top;
            this.top =newNode
        }
  this.size++;
}
pop(){
    if(this.top===null){
        return null;
    }
    const poppedNode = this.top;
    this.top = this.top.next;
    this.size--;
    return poppedNode.value;
}
peek(){
    if(this.top ==null){
        return null
    }
    return this.top.value;
}
isEmpty(){
    return this.size==0;
}
getSize(){
    return this.size;
}

}
class CircularQueue{
constructor(size){
    this.size = size;
    this.count=0;
    this.front = null;
    this.rear = null;
}
isFull(){
    return this.count===this.size;
}
isEmpty(){
    return this.count===0;
}
enqueue(value){
    if(this.isFull()){
        console.log('Queue is full')
    }
    const newNode = new Node(value);
    if(this.isEmpty()){
        this.front =newNode;
    }
    else{
        this.rear.next = newNode
    }
    this.rear = newNode;
    this.rear.next = this.front;
    count++


}
dequeue(){
     if(this.isEmpty()){
        console.log('Queue is empty')
     }
     if(this.front===this.rear){
        this.front = null;
        this.rear = null;
     }else {
        this.front = this.front.next;
        this.rear.next = this.front;
     }
     this.count --
}
}