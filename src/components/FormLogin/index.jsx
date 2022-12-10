import "./styles.css";
import { Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import UserService from "../../services/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [redirectToRegister, setRedirectToRegister] = useState(false);
  const [redirectToPipeline, setRedirectToPipeline] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    try {
      const login = await UserService.login({
        login: email,
        password: password,
      });
      setRedirectToPipeline(true);
      navigate("../dashboard");
    } catch (error) {
      if (error.message === "Network Error") {
        toast.error(<text id="toastMsg">Conexão recusada</text>);
        setLoading(false);
      } else {
        toast.error(<text id="toastMsg">Email ou senha inválida</text>);
        setLoading(false);
      }
    }
    // if (redirectToRegister) {
    //   navigate("../register");
    // }
    if (redirectToPipeline) {
      navigate("../dashboard");
    }
  };

  const newUser = () => {
    navigate("/criar-conta");
  };

  return (
    <>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <div className="">
        <Form
          key={1}
          className="d-flex justify-content-center align-items-center flex-column"
          // onKeyPress={(e) => {
          //   if (e.key === "Enter") {
          //     handleSignUp();
          //   }
          // }}
          onSubmit={handleSignUp}
        >
          <h2 className="mb-5 mt-5 pt-5" style={{ color: "#6c6c6c" }}>
            Login
          </h2>
          <Form.Group
            key={2}
            className="mb-2 d-flex flex-column"
            controlId="formBasicEmail"
          >
            <Form.Label className="mb-0">E-mail</Form.Label>
            <Form.Control
              className="px-4 py-1 inputPerson"
              placeholder="Insira seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // onKeyPress={(e) => {
              //   if (e.key === "Enter") {
              //     handleSignUp();
              //   }
              // }}
            />
          </Form.Group>
          <Form.Group
            className="mb-5 d-flex flex-column"
            controlId="formBasicPassword"
          >
            <Form.Label className="mb-0">Senha</Form.Label>
            <Form.Control
              className="px-4 py-1 inputPerson"
              type="password"
              placeholder="Insira sua senha,,,"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // onKeyPress={(e) => {
              //   if (e.key === "Enter") {
              //     handleSignUp();
              //   }
              // }}
            />
          </Form.Group>
          <Card
            className="border-2 rounded-0"
            style={{ width: "100%", borderLeft: "none", borderRight: "none" }}
          >
            <Card.Body key={3} className="d-flex justify-content-center space">
              <Form.Group className="">
                <button
                  key={4}
                  className="btn loginbtn  btn-color"
                  type="submit"
                >
                  Entrar
                </button>
                <button
                  key={5}
                  className="btn   btn-color"
                  onClick={(e) => newUser()}
                >
                  Cadastrar
                </button>
              </Form.Group>
            </Card.Body>
          </Card>

          <Card className="" style={{ width: "14.3rem", border: "none" }}>
            <Card.Body className="p-0">
              <Card.Link href="/forgotten-password">
                Recuperar a senha
              </Card.Link>
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
