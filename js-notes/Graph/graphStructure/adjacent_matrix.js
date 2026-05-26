class graphMatrix{
 constructor(numOfVertices){
    this.numOfVertices = numOfVertices;
    this.adjacencyMatrix=[];
    for(let i=0;i<this.numOfVertices;i++){
        this.adjacencyMatrix[i]=[];
        for(let j=0;j<this.numOfVertices;j++){
            this.adjacencyMatrix[i][j] =0;
        }
    }

 }  
 
 addEdge(source,destination){
this.adjacencyMatrix[source][destination]=1;
this.adjacencyMatrix[destination][source]=1;
 }
 removeEdge(source,destination){
    this.adjacencyMatrix[source][destination]=0;
    this.adjacencyMatrix[destination][source]=0;


 }
 printGraph(){
    for(let i=0;i<this.numOfVertices;i++){
        let row="";
        for(let j=0;j<this.numOfVertices;j++){
            row +=this.adjacencyMatrix[i][j]+""
        }
        console.log(row);

    }
 }
}
let graph = new graphMatrix(4);

graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 2);
graph.addEdge(2, 3);

graph.printGraph();