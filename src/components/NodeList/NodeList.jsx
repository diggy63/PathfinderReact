import React from "react";

import Node from "../Node/Node";

export default function NodeList({ nodes, checkNode }) {
    
  if(nodes.length > 20){
    console.log('added extra')
    nodes.pop()
  }

  const nodesList = nodes.map((item, i) => {
    if (i > 19) {
      console.log(nodes);
      return;
    }
    return item.map((itemNext, idx) => {
      return <Node key={i + idx} node={itemNext} checkNodeLift={checkNode} />;
    });
  });


  return( 
    <>
    {nodesList}
    </>
    )
}
