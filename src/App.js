import { useEffect, useState } from "react";
import { Container, Dropdown, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import "./App.css";

import Explore from "./pages/Explore/Explore";
import PokemonDetail from "./pages/PokemonDetail/PokemonDetail"
import MyPokemon from "./pages/MyPokemon/MyPokemon"

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleShow = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);

  const minDesktopScreen = 992;

  useEffect(() => {
    const resizeHandler = () => {
      const isShowSidebar = window.innerWidth > minDesktopScreen;
      setShowSidebar(isShowSidebar);
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return (
    <BrowserRouter>
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
            <Nav.Item as={NavLink} to="/">
              <div className="d-flex align-items-center p-2">
                <i class="bi bi-house-door fs-5"></i>
                <h4 className="ms-3 mb-0">Explore</h4>
              </div>
            </Nav.Item>
            <Nav.Item as={NavLink} to="/pokemon-detail">
              <div className="d-flex align-items-center p-2">
                <i class="bi bi-ticket-detailed fs-5"></i>
                <h4 className="ms-3 mb-0">Pokemon Detail</h4>
              </div>
            </Nav.Item>
            <Nav.Item as={NavLink} to="/my-pokemon">
              <div className="d-flex align-items-center p-2">
                <i class="bi bi-person fs-5"></i>
                <h4 className="ms-3 mb-0">My Pokemon</h4>
              </div>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <Container className="main-body px-2 pt-2 me-2" fluid>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/pokemon-detail" element={<PokemonDetail />} />
          <Route path="/my-pokemon" element={<MyPokemon />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
