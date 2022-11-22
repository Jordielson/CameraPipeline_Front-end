import { Navbar, Container } from "react-bootstrap";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function LogoTitle() {
  const navigate = useNavigate();

  const guidePage = () => {
    navigate("/guia");
  };

  return (
    <>
      <Navbar variant="dark">
        <Container className="d-flex">
          <Navbar.Brand href="/login" className="loginlogo">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Câmera Pipeline
          </Navbar.Brand>
          <span className="guide login-guide" onClick={guidePage}>
            Guia
          </span>
        </Container>
      </Navbar>
    </>
  );
}

export default LogoTitle;
