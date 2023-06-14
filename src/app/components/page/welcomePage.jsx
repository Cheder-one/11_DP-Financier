import { Container, Row, Col } from "react-bootstrap";

function WelcomePage() {
  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1>Financier</h1>
          <p>Welcome to Financier, your personal finance tracker.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default WelcomePage;
