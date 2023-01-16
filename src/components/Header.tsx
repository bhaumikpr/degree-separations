import React from "react";
import { Nav, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="justify-content-center mb-3">
      <Nav>
        <Nav.Item>
          <Nav.Link>Degree Of Seperation</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default Header;
