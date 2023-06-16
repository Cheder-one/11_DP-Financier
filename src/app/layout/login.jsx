import PropTypes from "prop-types";
import { Col, Container, Nav, Row } from "react-bootstrap";
import LoginForm from "../components/ui/entry-forms/loginForm";
import RegisterForm from "../components/ui/entry-forms/registerForm";

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
          <div className="mt-2">
            {formType === "login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  formType: PropTypes.string.isRequired,
  setFormType: PropTypes.func.isRequired
};

export default Login;
