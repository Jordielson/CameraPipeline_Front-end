import "./styles.css";
import { Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import UserService from "../../services/user";
import { toast } from "react-toastify";
import LogoTitle from "../../components/fragment/LogoTitle";
import { useNavigate } from "react-router-dom";
import { localURL } from "../../config/server/config";

function ForgottenPassword() {
  const [email, setEmail] = useState(""); 

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
    }
    return valid;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (validateFields().flag) {
      try {
        await toast.promise(
          UserService.forgotPassword({
            email: email,
            redirect: `${localURL}password-reset`
          }),
          {
            pending: {
              render({ data }) {
                return <text id="toastMsg">Processando</text>;
              },
            },
            success: {
              render({ data }) {
                return <text id="toastMsg">Foi enviado o link de recuperação para seu email</text>;
              },
            },
          }
        );
        backPage();
      } catch (error) {
        let errorMessage = "";
        switch (error.response.status) {
          case 404:
            errorMessage = "Verifique se seu email está correto"
            break;
          case 500:
            errorMessage = "Não foi possível enviar o email devido "+
              "a um erro interno, tente novamente mais tarde";
            break;
          default:
            errorMessage = "Não foi possível enviar o email";
            break;
        }
        toast.error(
          <text id="toastMsg">{errorMessage}</text>
        );
      }
    } else {
      toast.error(
        <text id="toastMsg">{validateFields().text}</text>
      );
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
        onSubmit={handleForgotPassword}
        id="forgot-password"
      >
        <h2 className="mb-5">Recuperar Email</h2>
        <Form.Group className="mb-4 d-flex flex-column">
          <Form.Label className="mb-0">Email</Form.Label>
          <Form.Control
            className="px-4 py-1 mb-2"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              Enviar
            </button>
            {/* </div> */}
          </Card.Body>
        </Card>
      </Form>
    </>
  );
}

export default ForgottenPassword;
