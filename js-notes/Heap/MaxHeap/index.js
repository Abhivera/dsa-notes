class MaxHeap {
    constructor() {
        this.heap = []
    }
    
    swap(i,j){
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
    parent(i){
        return Math.floor((i-1)/2)
    }
    leftChild(i)
    {
        return 2*i+1
    }
    rightChild(i)
    {
        return 2*i+2
    }
    maxHeapify(i){
      const left = this.leftChi
      ld(i)
      const right = this.rightChild(i)
      let largest = i
      if(this.heap[left]>this.heap[largest] && left<this.heap.length){
            largest = left;
        }
      if(this.heap[right]>this.heap[largest] && right<this.heap.length){
            largest = right;
        }
      if(largest!==i){
            this.swap(largest,i)
            this.maxHeapify(largest)
        }
        
        
    }
    
    insert(value){
        this.heap.push(value);
        let i = this.heap.length - 1;
        while(i>0 && this.heap[this.parent(i)]<this.heap[i]){
            this.swap(i,this.parent(i));
            i = this.parent(i)
        }
    }
    
    delete(){
        if (this.heap.length===0){
            return null 
        }
        const max = this.heap[0]
        this.heap[0] = this.heap[this.heap.length-1]
        this.heap.pop();
        this.maxHeapify(0);
        return max
        
    }
    
    
}
const heap = new MaxHeap();

heap.insert(10);
heap.insert(5);
heap.insert(15);
heap.insert(8);

console.log(heap.delete()); // Output: 15
console.log(heap.delete()); // Output: 10
console.log(heap.delete()); // Output: 8
console.log(heap.delete()); // Output: 5
