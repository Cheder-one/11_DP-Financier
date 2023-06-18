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

const CardHeder = () => {
  const headerLabels = [
    "Счета",
    <Dropdown key={"1"} />,
    <Button key={2}>text</Button>
  ];

  return (
    <Container>
      <Row>
        {headerLabels.map((item) => (
          <Col key={item} md="4" className="p-0 d-flex justify-content-center">
            <OverlayTooltip text={item} />
          </Col>
        ))}
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
