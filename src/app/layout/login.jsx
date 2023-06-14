import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/ui/entry-forms/loginForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const { type } = useParams();
  console.log(type);

  return (
    <Container className="mt-3">
      <Row>
        <Col
          md={{ span: 7 }}
          className="shadow p-4"
          style={{ maxWidth: "500px" }}
        >
          {/* <h3 className="mb-4 fw-bold">Login</h3> */}
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
