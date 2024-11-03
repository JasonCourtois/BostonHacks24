import { useSchool } from "../../hooks/SchoolContextProvider";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";

// TODO: use above navbar import
const SiteNavbar: React.FC = () => {
  const { setSelectedSchool } = useSchool();

  return (
    <Navbar expand="lg" className="bg-blue-200">
      <Container className="justify-between">
        <Navbar.Brand href="/">Study Spaces</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
