import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/ui/entry-forms/loginForm";
import {
  useLocation,
  useParams
} from "react-router-dom/cjs/react-router-dom.min";
import RegisterForm from "../components/ui/entry-forms/registerForm";
import { useState } from "react";

const Login = () => {
  const location = useLocation();
  console.log(location);

  const [formType, setFormType] = useState("");

  return (
    <Container className="mt-3">
      <Row>
        <Col md="7" className="shadow p-4" style={{ maxWidth: "500px" }}>
          <LoginForm />
          {/* <RegisterForm/> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
