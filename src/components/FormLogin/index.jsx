import "./styles.css";
import { Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import UserService from "../services/user";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const login = await UserService.login({
        email: email,
        password: password,
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="">
        <Form
          className="d-flex justify-content-center align-items-center flex-column"
          onSubmit={handleSignUp}
        >
          <h2 className="mb-5 mt-5 pt-5" style={{ color: "#996DFF" }}>
            Login
          </h2>
          <Form.Group
            className="mb-2 d-flex flex-column"
            controlId="formBasicEmail"
          >
            <Form.Label className="mb-0">E-mail</Form.Label>
            <Form.Control
              className="px-4 py-1"
              type="email"
              placeholder="Insira seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-5 d-flex flex-column"
            controlId="formBasicPassword"
          >
            <Form.Label className="mb-0">Senha</Form.Label>
            <Form.Control
              className="px-4 py-1"
              type="password"
              placeholder="Insira sua senha,,,"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Card
            className="border-2 rounded-0"
            style={{ width: "100%", borderLeft: "none", borderRight: "none" }}
          >
            <Card.Body className="d-flex justify-content-center space">
              <Button
                className="mx-4 btn-lg py-0"
                variant="primary"
                style={{ backgroundColor: "#996DFF" }}
                type="submit"
              >
                Entrar
              </Button>
              <Button
                className="mx-4"
                variant="primary"
                style={{ backgroundColor: "#996DFF" }}
              >
                Cadastrar
              </Button>
            </Card.Body>
          </Card>

          <Card className="" style={{ width: "14.3rem", border: "none" }}>
            <Card.Body className="p-0">
              <Card.Link href="#">Recuperar a senha</Card.Link>
            </Card.Body>
          </Card>
        </Form>
      </div>
      {/*  <Form className="d-flex flex-column align-items-center">
        <h1>Login</h1>
        <Stack gap={2} className="col-md-3 mx-auto">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>

            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Stack>
        <Card className="d-flex flex-row py-2 w-100 card">
          <Button className="m-3 px-5" variant="primary" type="submit">
            Entrar
          </Button>
          <Button className="m-3 px-5" variant="primary" type="submit">
            Cadastrar
          </Button>
        </Card>
      </Form> */}
    </>
  );
}

export default FormLogin;
