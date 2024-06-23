import React, { useState } from 'react'
import BaseNode from './baseNode'
import { Position } from 'reactflow';

const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handlesData = {
    rightNodes: 1,
    handles: [
      {
        type: "source",
        position: Position.Right,
        id: `${id}-value`
      }
    ]
  }

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const styles = {
    backgroundAndText : {
      backgroundColor: "rgba(67,10,137,255)", 
      padding: 2, color: "white"
    }
  }

  return (
    <BaseNode title='Input' handlesData={handlesData}>
        <div>
        <label >
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange} 
            style={styles.backgroundAndText}
          />
        </label>
        <label style={styles.marginFive}>
          Type:
          <select value={inputType} onChange={handleTypeChange} style={styles.backgroundAndText}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  )
}

export default InputNode