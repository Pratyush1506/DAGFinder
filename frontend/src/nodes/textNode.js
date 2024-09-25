import { useRef, useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const prevTextRef = useRef(currText);
  const [handlesData, setHandlesData] = useState({
    rightNodes: 1,
    leftNodes: 0,
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-output`,
      },
    ],
  });


  const isValidVariableName = (name) => {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
  };

  const handleTextChange = (e) => {
    setCurrText(e.target.value);

    const newText = e.target.value;
    const prevText = prevTextRef.current;
    if (newText !== prevText) {
      const newVariables = extractVariables(newText);
      const prevVariables = extractVariables(prevText);
      const addedVariables = newVariables.filter(
        (varName) => !prevVariables.includes(varName)
      );

      addedVariables.forEach((varName) => {
        setHandlesData((prevHandlesData) => ({
          ...prevHandlesData,
          leftNodes: prevHandlesData.leftNodes + 1,
          handles: [
            ...prevHandlesData.handles,
            {
              type: 'target',
              position: Position.Left,
              id: `${id}-${varName}`,
              label: varName, 
            },
          ],
        }));
      });

      prevTextRef.current = newText; 
    }
  };
  
  const extractVariables = (text) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      const varName = match[1].trim();
      if (isValidVariableName(varName)) {
        matches.push(varName);
      } else {
        console.warn(`Invalid variable name: ${varName}`);
      }
    }
    return matches;
  };

  

  return (
    <BaseNode title="Text" handlesData={handlesData}>
      <div>
        <label>
          Text:
          <textarea
            type="text"
            value={currText}
            onChange={handleTextChange}
            style={{resize: 'both'}}
            onInput={(e) => {
              e.target.style.height = 'auto';
              const scrollHeight = e.target.scrollHeight;
              const clientHeight = e.target.clientHeight;
              if (scrollHeight > clientHeight) {
                e.target.style.height = `${scrollHeight}px`;
              }
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
};
