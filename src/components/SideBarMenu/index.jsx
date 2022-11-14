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
      <div className="wrapper">
        <nav id="sidebar">
          <div className="main-nav">
            <div className="sidebar-header">
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
                  className="dashboard pointer"
                  onClick={(e) => navigate("../dashboard", { replace: true })}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#home"
                  className="edicao "
                  id="edicao"
                  onClick={handlerSubmenu}
                >
                  Processar
                </a>
                <li className="submenu" id="submenu">
                  <a
                    onClick={(e) =>
                      navigate("../processar-imagem", { replace: true })
                    }
                    className="submenu-list pointer"
                  >
                    Imagem
                  </a>
                  <a
                    onClick={(e) =>
                      navigate("../processar-video", { replace: true })
                    }
                    className="submenu-list pointer"
                  >
                    Video
                  </a>
                  <a
                    onClick={(e) =>
                      navigate("../processar-camera", { replace: true })
                    }
                    className="submenu-list pointer"
                  >
                    Camera
                  </a>
                </li>
              </li>
              <li className="pipelines pointer">
                <a
                  onClick={(e) =>
                    navigate("../pipeline-home", { replace: true })
                  }
                >
                  Pipelines
                </a>
              </li>
              <li className="camera pointer">
                <a onClick={(e) => navigate("../camera", { replace: true })}>
                  Câmeras
                </a>
              </li>
              <li className="servico pointer">
                <a onClick={(e) => navigate("../servico", { replace: true })}>
                  Serviços
                </a>
              </li>
              <li className="change-password pointer">
                <a
                  onClick={(e) =>
                    navigate("../alterar-senha", { replace: true })
                  }
                >
                  Alterar senha
                </a>
              </li>
              <li className="guia pointer">
                <a
                  onClick={(e) => navigate("../user-guide", { replace: true })}
                >
                  Guia
                </a>
              </li>
            </ul>
          </div>

          <div className="account">
            {/* <div>
              <span>{localStorage.getItem("login")}</span>
            </div> */}
            <div>
              <a className="logout" onClick={(e) => logOut()}>
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
