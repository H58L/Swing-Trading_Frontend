
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../style/Header.css"; // Import your custom CSS file
import Search from './Search'
import ThemeIcon from './ThemeIcon'
import { mockCompanyDetails } from '../constants/mock'

const Header = ({name}) => {
  return (
    <Navbar expand="lg" className="navbar-custom">
      {" "}
      {/* Apply custom class */}
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {/* Search Bar only visible on larger screens */}
        <div className="d-none d-lg-flex">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="form-control me-2" // Use class for styling
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </div>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }} // You can keep this for max height
            navbarScroll
          >
            <Nav.Link className="nav-element" href="#action1">
              Home
            </Nav.Link>
            <Nav.Link className="nav-element" href="#action2">
              Link
            </Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="nav-element" href="#" disabled>
              Link
            </Nav.Link>

              <div className = "xl:px-32">
            <h1 className="text-5xl">{name}</h1>
            <Search></Search>
        
              </div>  
            <ThemeIcon></ThemeIcon>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

// import React from 'react'
// import Search from './Search'
// import ThemeIcon from './ThemeIcon'
// import { mockCompanyDetails } from '../constants/mock'

// const Header = ({name}) => {
//   return (
//     <>
//      <div className = "xl:px-32">
      
//       <h1 className="text-5xl">{name}</h1>
//             <Search></Search>
        
//     </div>  
//     <ThemeIcon></ThemeIcon>
//     </>
    
//   )
// }

// export default Header

