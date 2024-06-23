// llmNode.js

import React from 'react';
import { Position } from 'reactflow';
import BaseNode from './baseNode';

export const LLMNode = ({ id, data }) => {

  const handlesData = {

    leftNodes: 2,
    rightNodes: 1,
    handles: [{
      type:"target",
      position: Position.Left,
      id: `${id}-system`,
    },
    {
      type:"target",
      position: Position.Left,
      id: `${id}-prompt`
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`
    }],
  };

  

  return (
    <BaseNode title="LLM" handlesData={handlesData}>
      <div style={{height: 50}}>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
