class Graph{
    constructor(){
        this.adjacencyList=new Map();
    }
    addVertex(vertex){
        this.adjacencyList.set(vertex,[]);
        }
    addEdge(source,destination){
        if(!this.adjacencyList.has(source)){
            this.addVertex(source);
        }
        if(!this.adjacencyList.has(destination)){
            this.addVertex(destination);
        }
        this.adjacencyList.get(source).push(destination);
        this.adjacencyList.get(destination).push(source)//unweighted graph
    }
    
    removeEdge(source,destination){
 this.adjacencyList.get(source)=this.adjacencyList.get(source).filter((vertex)=>vertex!=destination);
 this.adjacencyList.get(destination)=this.adjacencyList.get(destination).filter((vertex)=>vertex!=source);//unweighted edge
 }
   
    removeVertex(vertex){
        if(this.adjacencyList.has(vertex)){
            for(let adjacentVertex of this.adjacencyList.get(vertex)){
                this.removeEdge(adjacentVertex,vertex);
                
            }
            this.adjacencyList.delete(vertex);
        }
    }
    bfsTraversal(startVertex){
        let queue=[startVertex];
        let visited = new Set();
        let result=[];
        while(queue.length>0){
            let currentVertex = queue.shift();
              if(!visited.has(currentVertex)){
            visited.add(currentVertex);
            result.push(currentVertex);
            this.adjacencyList.get(currentVertex).forEach((neighbour)=>{
              
                    queue.push(neighbour);
                }
            )}
        }
        return result;
    }
    
}
let graph = new Graph();
graph.addEdge(2,3);
graph.addEdge(2,5);
graph.addEdge(1,3);
console.log(graph.bfsTraversal(1))
