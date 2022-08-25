import React from "react";

import Node from "../Node/Node";

export default function NodeList({ nodes, checkNode }) {
  // console.log("nodelist loaded")
  // console.log(nodes)
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
