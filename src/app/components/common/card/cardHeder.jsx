import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const CardHeder = () => {
  return (
    <thead>
      <tr>
        <th>Доход</th>
        <th>Основной</th>
        <th className="d-flex justify-content-center">
          <Button
            variant="outline-success btn-sm"
            style={{ padding: "0px 8px", fontSize: "15px" }}
          >
            +
          </Button>
        </th>
      </tr>
    </thead>
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
