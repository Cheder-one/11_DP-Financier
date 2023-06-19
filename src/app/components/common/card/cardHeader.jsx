import {
  Button,
  Col,
  Container,
  Dropdown,
  Nav,
  NavDropdown,
  Navbar,
  Row
} from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";
import _ from "lodash";

const CardHeader = () => {
  const headerLabels = _.times(3, (i) => `header ${i}`);

  return null;
  // <Navbar bg="light" expand="sm" className="p-0 m-0">
  //   <Container>
  //     <Navbar.Brand className="fs-6 " href="#home">
  //       Доход
  //     </Navbar.Brand>
  //     <Navbar.Toggle aria-controls="basic-navbar-nav" />

  //     <Navbar.Collapse id="basic-navbar-nav">
  //       <Nav className="me-auto">
  //         <NavDropdown title="Основной" id="basic-nav-dropdown">
  //           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
  //         </NavDropdown>
  //       </Nav>
  //     </Navbar.Collapse>
  //   </Container>
  // </Navbar>
};

export default CardHeader;
