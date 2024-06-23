import React, { useState } from 'react'
import BaseNode from './baseNode'
import { Position } from 'reactflow'

const VariableNode = ({ id, data }) => {

    const [currValue, setCurrValue] = useState("value");

    const handlesData = {
        rightNodes: 1,
        handles: [
            {
                type: "source",
                position: Position.Right,
                id: `${id}-var-value`
            },
        ]
    }

    const handleValueChange = (e) => {
        setCurrValue(e.target.value);
      };
    
      const styles = {
        backgroundAndText : {
          backgroundColor: "rgba(67,10,137,255)", 
          padding: 2, color: "white"
        }
      }

  return (
    <BaseNode title="Variable" handlesData={handlesData} >
        <div>
            <label>
                Value:
                <input 
                type="text" 
                value={currValue} 
                onChange={handleValueChange} 
                style={styles.backgroundAndText}
            />
            </label>
        </div>
    </BaseNode>
  )
}

export default VariableNode