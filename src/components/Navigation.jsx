import { useNavigate } from "react-router-dom";
import { signOutAuthUser } from "../utils/firebase.utils";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = ({ theme }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutAuthUser();
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      bg={theme}
      data-bs-theme={theme}
      className="border-bottom"
    >
      <Container>
        <Navbar.Brand>BetaBox</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/history">History</Nav.Link>
            <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
