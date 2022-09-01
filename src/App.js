import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";

import "./App.css";

import useMediaQuery from "./hooks/useMediaQuery";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleShow = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);

  const isMobile = useMediaQuery(992);

  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [isMobile]);

  return (
    <>
      <Navbar bg="dark" expand="lg" className="navbar-dark">
        <Container fluid>
          <Navbar.Toggle onClick={handleShow} />
          <Navbar.Brand>Pokemon Tamer</Navbar.Brand>
          <Dropdown>
            <Dropdown.Toggle variant="dark">
              <i class="bi bi-person fs-6"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>My Pokemon</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      <Offcanvas
        show={showSidebar}
        onHide={handleClose}
        className="sidebar-nav"
      >
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Item>
              <div className="d-flex align-items-center p-2">
                <i class="bi bi-house-door fs-5"></i>
                <h4 className="ms-3 mb-0">Explore</h4>
              </div>
            </Nav.Item>
            <Nav.Item>
              <div className="d-flex align-items-center p-2">
                <i class="bi bi-ticket-detailed fs-5"></i>
                <h4 className="ms-3 mb-0">Pokemon Detail</h4>
              </div>
            </Nav.Item>
            <Nav.Item>
              <div className="d-flex align-items-center p-2">
                <i class="bi bi-person fs-5"></i>
                <h4 className="ms-3 mb-0">My Pokemon</h4>
              </div>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <Container className="main-body px-2 pt-2" fluid>
        <h1>Explore The Pokemon</h1>
        <hr />
      </Container>
    </>
  );
}

export default App;
