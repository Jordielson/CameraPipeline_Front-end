import "./styles.css";
import { Form, Button } from "react-bootstrap";
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
      text: ''
    };

    if(email === ""){
      valid.flag = false;
      valid.text = "Preencha o campo de email"
    }else if(password.length < 6){
      valid.flag = false;
      valid.text = "Senha deve conter no mínimo seis dígitos"
    }else if(password !== confirmPassword){
      valid.flag = false;
      valid.text = "Senha não confirmada"
    }
    return valid;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if(validateFields().flag){
      try {
        await toast.promise(UserService.register({
          email: email,
          password: confirmPassword
        }), 
        {
          pending: "Processando",
          success: "Conta criada com sucesso! ",
        });
        backPage();
      } catch (error) {
        let errorMessage = '';
        switch(error.message) {
          case "Request failed with status code 400":
            errorMessage = "Email já está sendo utilizado, tente outro."
            break;
          default:
            errorMessage = error.message;
            break;
        }
        toast.error(errorMessage);
      }
    }else {
      toast.error(validateFields().text);
    }
  };

  const navigate = useNavigate();

  const backPage = () => {
    navigate("/login");
  }

  return (
    <>
      <LogoTitle/>
      <Form 
          className="d-flex justify-content-center align-items-center flex-column"
          onSubmit={handleRegister}
          id="new-user"
          >
        <h2 className="mb-5">
          Crie sua conta
        </h2>
        <Form.Group
            className="mb-4 d-flex flex-column"
          >

          <Form.Label className="mb-0">Email</Form.Label>
          <Form.Control
            className="px-4 py-1 mb-2"
            type="email"
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
        <div className="d-flex">
          <Button
              className="no-shadow mx-4"
              onClick={backPage}
            >
            Voltar
          </Button>
          <Button
              className="no-shadow mx-4"
              type="submit"
            >
            Cadastrar
        </Button>
        </div>
      </Form>
    </>
  );
}

export default NewUser;