import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/ui/entry-forms/loginForm";

const Login = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col className="shadow p-4">
          <h3 className="mb-4 fw-bold">Login</h3>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
