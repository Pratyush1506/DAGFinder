
# Pipeline Builder and DAG Finder 

This project implements a visual pipeline builder with backend validation to ensure Directed Acyclic Graphs (DAGs).


![dagfinder](https://github.com/user-attachments/assets/67f2b81b-6b6c-4401-abe0-fb0e387617cf)

## Features

- **Pipeline Builder**: Provides a user-friendly interface for constructing pipelines by dragging and dropping various node types.
- **Node Types**: Offers a diverse range of node types to represent different operations or data sources within the pipeline.
- **Visualization**:  Displays the pipeline structure visually, making it easy to understand and identify potential issues.
- **DAG Verification**: VEnsures that the created pipelines are valid Directed Acyclic Graphs (DAGs).



## Tech Stack
- **Frontend**: React
- **Backend**: Python, FastAPI
## Getting Started

Clone the project

```bash
  git clone https://github.com/Pratyush1506/DAGFinder.git
```


**Go to the project directory**

```bash
  cd my-project
```

**Inside frontend folder run**

```bash
npm install
npm start
```

**Inside backend folder run**

```bash
uvicorn main:app --reload
```
