import { Navbar, Container } from "react-bootstrap";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function LogoTitle() {

  const navigate = useNavigate();

  const guidePage = () => {
    navigate("/guia");
  }

  return (
    <>
      <Navbar variant="dark">
        <Container className="justify-content-center">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Câmera Pipeline
          </Navbar.Brand>
        </Container>
        <span className='guide' onClick={guidePage}>Guia</span>
      </Navbar>
    </>
  );
}

export default LogoTitle;
