import "./styles.css";
import { Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import UserService from "../../services/user";
import { toast } from "react-toastify";
import LogoTitle from "../../components/fragment/LogoTitle";
import { useNavigate, useParams } from "react-router-dom";

function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetString } = useParams();

  const validateFields = () => {
    let valid = {
      flag: true,
      text: "",
    };

    if (password.length < 6) {
      valid.flag = false;
      valid.text = "Senha deve conter no mínimo seis dígitos";
    } else if (password !== confirmPassword) {
      valid.flag = false;
      valid.text = "Senha não confirmada";
    }
    return valid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateFields().flag) {
      try {
        await toast.promise(
          UserService.passwordReset({
            token: resetString,
            newpassword: confirmPassword,
          }),
          {
            pending: {
              render({ data }) {
                return <text id="toastMsg">Processando</text>;
              },
            },
            success: {
              render({ data }) {
                return <text id="toastMsg">Senha alterada!!</text>;
              },
            },
          }
        );
        backPage();
      } catch (error) {
        let errorMessage = "";
        switch (error.response.status) {
          case 404:
            errorMessage = "Usuário não encontrado"
            break;
          case 400:
            errorMessage = "Tempo para alterar a senha acabou, "+
                "solicite o envio de outro email com novo link.";
            break;
          case 400:
            errorMessage = "Não foi alterar a senha devido "+
                "a um erro interno, tente novamente mais tarde.";
            break;
          default:
            errorMessage = "Não foi possível alterar a senha";
            break;
        }

        toast.error(
          <text id="toastMsg">{errorMessage}</text>
        );
      }
    } else {
      toast.error(validateFields().text);
    }
  };

  const navigate = useNavigate();

  const backPage = () => {
    navigate("/login");
  };
  const navigateToForgotPassword = () => {
    navigate("/forgotten-password");
  };

  return (
    <>
      <LogoTitle />
      <Form
        className="d-flex justify-content-center align-items-center flex-column"
        onSubmit={handleRegister}
        id="new-user"
      >
        <h2 className="mb-5">Altere sua senha</h2>
        <Form.Group className="mb-4 d-flex flex-column">
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
            <button className="btn no-shadow mx-4 btn-color" onClick={backPage}>
              Voltar
            </button>
            <button className="btn no-shadow mx-4 btn-color" type="submit">
              Alterar
            </button>
            {/* </div> */}
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}

export default PasswordReset;
