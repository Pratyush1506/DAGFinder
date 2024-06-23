from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx

app = FastAPI()

# CORS setup
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Pydantic models
class Node(BaseModel):
    id: str
    data: Dict[str, Any]

class Edge(BaseModel):
    source: str
    target: str

class GraphInput(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class GraphOutput(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

# Route definitions
@app.post("/check-graph/", response_model=GraphOutput)
async def check_graph(graph: GraphInput):
    G = nx.DiGraph()
    
    # Add nodes to the graph
    for node in graph.nodes:
        G.add_node(node.id)
    
    # Add edges to the graph
    for edge in graph.edges:
        G.add_edge(edge.source, edge.target)
    
    num_nodes = G.number_of_nodes()
    num_edges = G.number_of_edges()
    is_dag = nx.is_directed_acyclic_graph(G)
    
    return GraphOutput(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag
    )

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.get('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    return {'status': 'parsed'}

# This block will only execute if this script is run directly
# This is where you start the FastAPI application using uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
