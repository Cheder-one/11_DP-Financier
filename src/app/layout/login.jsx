import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/ui/entry-forms/loginForm";

const Login = () => {
  return (
    <Container className="mb-5">
      <Row>
        <Col
          md={{ span: 7 }}
          className="shadow p-4"
          style={{ maxWidth: "500px" }}
        >
          <h3 className="mb-4 fw-bold">Login</h3>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
