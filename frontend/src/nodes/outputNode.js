// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');


  const styles = {
    backgroundColor: "rgba(67,10,137,255)", 
    padding: 2, color: "white",
  }

  const handlesData = {
    leftNodes: 1,
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: `${id}-value`
      }
    ]
  }

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode title="Output" handlesData={handlesData}>
      <div>
        <label>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange} 
            style={styles}
          />
        </label>
        <label>
          Type:
          <select value={outputType} onChange={handleTypeChange} style={styles}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}
