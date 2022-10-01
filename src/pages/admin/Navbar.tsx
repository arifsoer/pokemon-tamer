import React from 'react'
import { Container, Dropdown, Navbar } from 'react-bootstrap'

interface Props {
  handleShow: () => void
}

const NavigationBar = ({ handleShow }: Props) => {
  return (
    <Navbar bg="dark" expand="lg" className="navbar-dark">
      <Container fluid>
        <Navbar.Toggle onClick={handleShow} />
        <Navbar.Brand>Pokemon Tamer</Navbar.Brand>
        <Dropdown>
          <Dropdown.Toggle variant="dark">
            <i className="bi bi-person fs-6"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-pos">
            <Dropdown.Item>My Pokemon</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default NavigationBar