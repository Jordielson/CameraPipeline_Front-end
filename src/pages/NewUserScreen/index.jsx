import "./styles.css";
import { Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import UserService from "../../services/user";
import { toast } from "react-toastify";
import LogoTitle from "../../components/fragment/LogoTitle";
import { useNavigate } from "react-router-dom";

function NewUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateFields = () => {
    let valid = {
      flag: true,
      text: "",
    };

    var regexEmail = /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z](?:[a-z-][a-z])?.)+[a-z](?:[a-z-]*[a-z])?/;

    if (email === "") {
      valid.flag = false;
      valid.text = "Preencha o campo de email";
    } else if (!regexEmail.test(email)) {
      valid.flag = false;
      valid.text = "Formato de email inválido.";
    } else if (password.length < 6) {
      valid.flag = false;
      valid.text = "Senha deve conter no mínimo seis dígitos";
    } else if (password !== confirmPassword) {
      valid.flag = false;
      valid.text = "Senha não confirmada.";
    }
    return valid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateFields().flag) {
      try {
        await toast.promise(
          UserService.register({
            email: email,
            password: confirmPassword,
          }),
          {
            pending: {
              render({ data }) {
                return <text id="toastMsg">Processando</text>;
              },
            },
            success: {
              render({ data }) {
                return <text id="toastMsg">Conta criada com sucesso!</text>;
              },
            },
          }
        );
        backPage();
      } catch (error) {
        let errorMessage = "";
        switch (error.message) {
          case "Request failed with status code 400":
            errorMessage = "Email já está sendo utilizado, tente outro.";
            break;
          default:
            errorMessage = error.message;
            break;
        }
        toast.error(<text>{errorMessage}</text>);
      }
    } else {
      toast.error(<text id="toastMsg">{validateFields().text}</text>);
    }
  };

  const navigate = useNavigate();

  const backPage = () => {
    navigate("/login");
  };

  return (
    <>
      <LogoTitle />
      <Form
        className="d-flex justify-content-center align-items-center flex-column"
        onSubmit={handleRegister}
        id="new-user"
      >
        <h2 className="mb-5" style={{color: "#6c6c6c"}}>Crie sua conta</h2>
        <Form.Group className="mb-4 d-flex flex-column">
          <Form.Label className="mb-0">Email</Form.Label>
          <Form.Control
            className="px-4 py-1 mb-2"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Label className="mb-0">Senha</Form.Label>
          <Form.Control
            className="px-4 py-1 mb-2"
            type="password"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Form.Label className="mb-0">Confirme a senha</Form.Label>
          <Form.Control
            className="px-4 py-1 mb-2"
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Card
          className="border-2 rounded-0"
          style={{ width: "100%", borderLeft: "none", borderRight: "none" }}
        >
          <Card.Body className="d-flex justify-content-center space">
            <Button className="no-shadow mx-4 btn-color" onClick={backPage}>
              Voltar
            </Button>
            <Button className="no-shadow mx-4 btn-color" type="submit">
              Cadastrar
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}

export default NewUser;
