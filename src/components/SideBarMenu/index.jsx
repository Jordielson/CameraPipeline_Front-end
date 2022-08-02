import "./styles.css";
import UserService from "../../services/user";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function SidebarMenu() {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate();

  const logOut = async () => {
    await UserService.logout();
    setRedirectToHome(true);
  };

  if (redirectToHome == true) {
    navigate("../login", { replace: true });
  }
  return (
    <>
      <div class="wrapper">
        <nav id="sidebar">
          <div className="main-nav">
            <div class="sidebar-header">
              <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              <h5>Câmera Pipeline</h5>
            </div>

            <ul class="list-unstyled components">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#home">Mosaico</a>
              </li>
              <li class="active">
                <a href="/pipeline">Pipelines</a>
              </li>
              <li>
                <a href="#home">Câmeras</a>
              </li>
              <li>
                <a href="/pdi">PDIs</a>
              </li>
              <li>
                <a href="#home">Alterar senha</a>
              </li>
            </ul>
          </div>

          <div class="account">
            <div>
              <span>{localStorage.getItem("login")}</span>
            </div>
            <div>
              <a href="#" class="logout" onClick={(e) => logOut()}>
                sair
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default SidebarMenu;
