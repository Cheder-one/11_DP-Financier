import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-5">
      <Container className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
        <p className="m-0 text-center text-sm-start">
          © 2023 Financier. All Rights Reserved.
        </p>
        <Link to="/feedback">
          <Button variant="light btn-sm">Contact Us</Button>
        </Link>
      </Container>
    </footer>
  );
};

export default Footer;
