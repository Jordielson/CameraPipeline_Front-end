import { Navbar, Container } from "react-bootstrap";
import "./styles.css";

function LogoTitle() {
  return (
    <>
      <Navbar className="barra" variant="dark">
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
      </Navbar>
    </>
  );
}

export default LogoTitle;
