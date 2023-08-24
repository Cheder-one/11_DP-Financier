import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Divider } from "../common/typography";

const Footer = () => {
  return (
    <>
      <Divider className="mt-" />
      <footer className="bg-light py-3">
        <Container className="flex flex-column flex-sm-row justify-between items-center p-0">
          <p className="m-0 text-center text-sm-start">
            © 2023 Financier. All Rights Reserved.
          </p>
          <Link to="/feedback">
            <Button variant="light btn-sm">Contact Us</Button>
          </Link>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
