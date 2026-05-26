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
    dfs(startVertex){
        const visited= new Set();
        const result = []
        this.dfsHelper(startVertex,visited,result);
        return result;
    }
dfsHelper(vertex,visited,result){
visited.add(vertex);
result.push(vertex);
this.adjacencyList.get(vertex).forEach(
    (neighbor)=>{
        if(!visited.has(neighbor)){
            this.dfsHelper(neighbor,visited,result);
        }
    }
)
    }
    }class Graph{
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
        dfsTraversal(startVertex){
          let result=[];
          let visited= new Set();
          this.dfsHelper(startVertex,visited,result)
          return result;
        }
        dfsHelper(vertex,visited,result){
            visited.add(vertex);
            result.push(vertex);
            this.adjacencyList.get(vertex).forEach((neighbour)=>{
                if(!visited.has(neighbour)){
                    this.dfsHelper(neighbour,visited,result);
                }
            })
        }
    }
    let graph = new Graph();
    graph.addEdge(2,3);
    graph.addEdge(2,5);
    graph.addEdge(1,3);
    console.log(graph.dfsTraversal(1))
    