import { Col, Container, Nav, Row } from "react-bootstrap";
import LoginForm from "../components/ui/entry-forms/loginForm";
import RegisterForm from "../components/ui/entry-forms/registerForm";
import { useState } from "react";

const Login = ({ formType, setFormType }) => {
  return (
    <Container className="mt-3">
      <Row>
        <Col md="7" className="shadow p-4" style={{ maxWidth: "500px" }}>
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="login"
            activeKey={formType}
            onSelect={(selectedKey) => setFormType(selectedKey)}
          >
            <Nav.Item>
              <Nav.Link eventKey="login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="register">Register</Nav.Link>
            </Nav.Item>
          </Nav>
          {formType === "login" ? <LoginForm /> : <RegisterForm />}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
