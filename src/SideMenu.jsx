import { Offcanvas, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const SideMenu = ({ showSidebar, handleClose }) => {

  const menus = [
    {
      name: 'Explore',
      icon: 'bi-house-door',
      to: '/'
    },
    {
      name: 'My Pokemon',
      icon: 'bi-person',
      to: '/my-pokemon'
    }
  ]

  return <Offcanvas
    show={showSidebar}
    onHide={handleClose}
    className="sidebar-nav"
  >
    <Offcanvas.Body>
      <Nav className="flex-column">
        {menus.map(menu => <Nav.Item as={NavLink} to={menu.to} key={menu.to}>
          <div className="d-flex align-items-center p-2">
            <i className={`bi ${menu.icon} fs-5`}></i>
            <h4 className="ms-3 mb-0">{menu.name}</h4>
          </div>
        </Nav.Item>)}
      </Nav>
    </Offcanvas.Body>
  </Offcanvas>
}

export default SideMenu