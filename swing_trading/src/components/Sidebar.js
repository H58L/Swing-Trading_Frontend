// Sidebar.js
import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = ({ show, onClose }) => {
  return (
    <div
      className={`sidebar ${show ? "show" : ""}`}
      onClick={onClose} // Close sidebar when clicked outside
    >
      <div className="sidebar-content" onClick={(e) => e.stopPropagation()}>
        <h2>Sidebar</h2>
        <Nav className="flex-column">
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">Link</Nav.Link>
          <Nav.Link href="#action3">Action</Nav.Link>
          <Nav.Link href="#action4">Another action</Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
