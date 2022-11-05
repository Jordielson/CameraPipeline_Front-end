import "./styles.css";
import UserService from "../../services/user";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

function SidebarMenu(props) {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const logOut = async () => {
    await UserService.logout();
    setRedirectToHome(true);
  };
  useEffect(() => {
    if (document.getElementsByClassName(props.page)[0]) {
      document.getElementsByClassName(props.page)[0].style.background = "#fff";
      document.getElementsByClassName(props.page)[0].style.color = "#000";
    }
  }, [props.page]);

  if (redirectToHome == true) {
    navigate("../login", { replace: true });
  }

  function handlerSubmenu() {
    var submenu = document.getElementById("submenu");
    if (submenu.style.display == "flex") {
      submenu.style.display = "none";
    } else {
      submenu.style.display = "flex";
    }
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
            <ul className="list-unstyled components">
              <li>
                <a
                  className="dashboard"
                  onClick={(e) => navigate("../dashboard", { replace: true })}
                  href="#"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#home"
                  className="edicao"
                  id="edicao"
                  onClick={handlerSubmenu}
                >
                  Edição
                </a>
                <li className="submenu" id="submenu">
                  <a
                    onClick={(e) =>
                      navigate("../editar-imagem", { replace: true })
                    }
                    href="#"
                    className="submenu-list"
                  >
                    Imagem
                  </a>
                  <a
                    onClick={(e) =>
                      navigate("../editar-video", { replace: true })
                    }
                    href="#"
                    className="submenu-list"
                  >
                    Video
                  </a>
                  <a
                    onClick={(e) =>
                      navigate("../editar-camera", { replace: true })
                    }
                    href="#"
                    className="submenu-list"
                  >
                    Camera
                  </a>
                </li>
              </li>
              <li className="pipelines">
                <a
                  onClick={(e) =>
                    navigate("../pipeline-home", { replace: true })
                  }
                  href="#"
                >
                  Pipelines
                </a>
              </li>
              <li className="camera">
                <a
                  onClick={(e) => navigate("../camera", { replace: true })}
                  href="#"
                >
                  Câmeras
                </a>
              </li>
              <li className="pdi">
                <a
                  onClick={(e) => navigate("../pdi", { replace: true })}
                  href="#"
                >
                  PDIs
                </a>
              </li>
              <li className="change-password">
                <a
                  onClick={(e) =>
                    navigate("../alterar-senha", { replace: true })
                  }
                  href="#"
                >
                  Alterar senha
                </a>
              </li>
              <li className="guia">
                <a
                  onClick={(e) => navigate("../user-guide", { replace: true })}
                  href="#"
                >
                  Guia
                </a>
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
