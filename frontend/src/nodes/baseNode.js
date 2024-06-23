import React from 'react'
import { Handle, Position } from 'reactflow'

const BaseNode = ({title, handlesData, children}) => {

  
  let leftCount = 1; //TO KEEP TRACK OF LEFT NODES
  let rightCount = 1; //TO KEEP TRACK OF RIGHT NODES


  const calculateTop = (position) => {
    let multiplier = 1;
    if (position === Position.Left) {
      multiplier =  100*(leftCount/(handlesData.leftNodes+1)); 
      leftCount++;
    } else if (position === Position.Right) {
      multiplier =  100*(rightCount/(handlesData.rightNodes+1)); 
      rightCount++;
    }
    return `${multiplier}%`;
  };

  return (
    <div style={{width: 200, padding: 8, border: '1px solid black', minHeight: 75, backgroundColor: "rgba(29,12,72,255)"}}>
        <div style={{width: "100%", backgroundColor: "rgba(67,10,137,255)", padding: 2, color: "white"}}>
            <span>
                {title}
            </span>
        </div>
        {
          handlesData.handles.map((handle, index) => (
              <Handle 
              key={`handle-${index}`}
              type={handle.type}
              position={handle.position}
              id={handle.id}
              style={{ top: `${calculateTop(handle.position)}` }}
            />
            )
          )
        }
        <div style={{backgroundColor: "rgba(67,10,137,255)", color: "white", width: "100%", padding: 2}}>
        {children}
        </div>
    </div>
  )
}

export default BaseNode