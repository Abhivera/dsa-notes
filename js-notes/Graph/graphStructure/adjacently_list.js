class Graph{
constructor(){
        this.adjacencyList = new Map();
}
addVertex(vertex){
    this.adjacencyList.set(vertex,[]);
}

addEdge(source,destination){
 if(!this.adjacencyList.has(source)){
    this.addVertex(source)
 }
 
 if(!this.adjacencyList.has(destination))
 {
    this.addVertex(destination)
 }
 this.adjacencyList.get(source).push(destination);
 this.adjacencyList.get(destination).push(source);//undirected graph

}

removeEdge(source,destination){
    if(this.adjacencyList.has(source)){
    this.adjacencyList.get(source) = this.adjacencyList.get(source).filter((vertex)=>vertex !==destination)
    }
    if(this.adjacencyList.has(destination)){
    this.adjacencyList.get(destination) = this.adjacencyList.get(destination).filter((vertex)=>vertex!==source)
    }
}
removeVertex(vertex){
    if(this.adjacencyList.has(vertex)){
        for(let adjacentVertex of this.adjacencyList.get(vertex)){
            this.removeEdge(adjacentVertex,vertex)
        }
        this.adjacencyList.delete(vertex)
    }
}
}