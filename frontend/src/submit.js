// submit.js

import React from 'react';
import { useStore } from './store'; // Import your custom store


export const SubmitButton = () => {


    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
      }));

      const style = {
        width: 150,
        height: 55,
        fontSize: 22
      }
    
      
      const handleSubmit = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nodes: nodes.map((node) => ({ id: node.id, data: node.data })),
              edges: edges.map((edge) => ({ source: edge.source, target: edge.target })),
            }),
          });
    
          const result = await response.json();
          alert(`Number of nodes: ${result.num_nodes}\nNumber of edges: ${result.num_edges}\nIs DAG: ${result.is_dag}`);
        } catch (error) {
          console.error('Error submitting the pipeline:', error);
          alert('Failed to submit the pipeline. Please try again.');
        }
      };


    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 10 }} >
        <button style={style} type="button" onClick={handleSubmit}>Submit</button>
      </div>
    );
}
