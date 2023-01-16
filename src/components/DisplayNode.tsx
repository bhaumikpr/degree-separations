import React from "react";
import { Badge } from "react-bootstrap";
import Node from "../utils/node";

function DisplayNode({ node }: { node: Node }) {
  return (
    <span className="me-1" key={node.value}>
      <Badge bg="info">{node.value}</Badge>
    </span>
  );
}

export default DisplayNode;
