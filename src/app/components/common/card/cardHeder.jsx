import {
  Button,
  Col,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Row
} from "react-bootstrap";
import OverlayTooltip from "../typography/overlayTooltip";

const CardHeder = () => {
  return (
    <Container>
      <Row>
        <Col md="4" className="p-0 d-flex justify-content-center">
          <OverlayTooltip text="Расхооssssssод" />
          {/* Расход */}
        </Col>
        <Col md="4">sssssss</Col>
        <Col md="4">sssssss</Col>
      </Row>
    </Container>
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
  );
};

export default CardHeder;
