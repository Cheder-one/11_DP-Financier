import { Container, Row, Col } from "react-bootstrap";

function WelcomePage() {
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h1>Financier</h1>
          <p>Welcome to Financier, your personal finance tracker.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default WelcomePage;
