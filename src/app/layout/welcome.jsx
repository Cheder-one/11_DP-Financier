import { Col, Container, Row } from "react-bootstrap";
import WelcomePage from "../components/page/welcomePage";
import Login from "./login";

const Welcome = () => {
  return (
    <>
      <Container className="d-flex">
        <Row>
          <Col>
            <WelcomePage />
            <Login />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
