import "./styles.css";
import UserService from "../../services/user";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

function SidebarMenu(props) {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate();

  const logOut = async () => {
    await UserService.logout();
    setRedirectToHome(true);
  };
  if (props) {
    console.log(document.getElementsByClassName(props.page)[0]);
  }
  useEffect(() => {
    if (document.getElementsByClassName(props.page)[0]) {
      document.getElementsByClassName(props.page)[0].style.background = "#fff";
      document.getElementsByClassName(props.page)[0].style.color = "#000";
    }
  }, [props.page]);

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
            <div className="px-2 d-flex flex-row align-items-center pr-2">
              <div className="px-1"></div>
              <span className="email">{localStorage.getItem("login")}</span>
            </div>
            <ul class="list-unstyled components">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#home">Mosaico</a>
              </li>
              <li className="pipeline">
                <a href="/pipeline">Pipelines</a>
              </li>
              <li className="camera">
                <a href="/camera">Câmeras</a>
              </li>
              <li className="pdi">
                <a href="/pdi">PDIs</a>
              </li>
              <li className="change-password">
                <a href="/alterar-senha">Alterar senha</a>
              </li>
              <li className="guia">
                <a href="/user-guide">Guia</a>
              </li>
            </ul>
          </div>

          <div class="account">
            {/* <div>
              <span>{localStorage.getItem("login")}</span>
            </div> */}
            <div>
              <a href="#" class="logout" onClick={(e) => logOut()}>
                <IoIosLogOut />
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
