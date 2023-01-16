import React from "react";
import Card from "react-bootstrap/Card";

function CardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Card className="text-center">
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}

export default CardLayout;
