import "../styles.css";
import { useState } from "react";
import { useEffect } from "react";
import SidebarMenu from "./../../../components/SideBarMenu/index";
import gif from "../../../assets/animação.gif";

function UserGuideScreen() {
  const [vision, setVision] = useState(0);

  useEffect(() => {
    const change = () => {
      const opt1 = document.getElementById("opt1");
      const opt2 = document.getElementById("opt2");
      const opt3 = document.getElementById("opt3");
      const opt4 = document.getElementById("opt4");

      switch (vision) {
        case VisionsEnum.Overview:
          opt1.classList.add("active");
          opt2.classList.remove("active");
          opt3.classList.remove("active");
          opt4.classList.remove("active");
          break;
        case VisionsEnum.Pipelines:
          opt2.classList.add("active");
          opt1.classList.remove("active");
          opt3.classList.remove("active");
          opt4.classList.remove("active");
          break;
        case VisionsEnum.Cameras:
          opt3.classList.add("active");
          opt2.classList.remove("active");
          opt1.classList.remove("active");
          opt4.classList.remove("active");
          break;
        case VisionsEnum.CameraMosaics:
          opt4.classList.add("active");
          opt2.classList.remove("active");
          opt3.classList.remove("active");
          opt1.classList.remove("active");
          break;
        default:
          break;
      }
    };
    change();
  }, [vision]);

  const VisionsEnum = {
    Overview: 0,
    Pipelines: 1,
    Cameras: 2,
    CameraMosaics: 3,
  };

  return (
    <div className="content">
      <SidebarMenu page={"guia"} />
      <div className="content-body">
        <h2 className="mb-5" style={{ marginLeft: "5%", marginTop: "50px" }}>
          Guia
        </h2>

        <div className="area-navs" id="topheader">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a id="opt1" className="nav-link" onClick={() => setVision(0)}>
                Visão geral
              </a>
            </li>
            <li className="nav-item">
              <a id="opt2" className="nav-link" onClick={() => setVision(1)}>
                Pipelines
              </a>
            </li>
            <li className="nav-item">
              <a id="opt3" className="nav-link" onClick={() => setVision(2)}>
                Câmeras
              </a>
            </li>
            <li className="nav-item">
              <a id="opt4" className="nav-link" onClick={() => setVision(3)}>
                Mosaicos das câmeras
              </a>
            </li>
          </ul>

          {vision === 0 ? (
            <div className="vision">
              <h4>Câmera Pipeline</h4>
              <span>
                Bem-vindo ao Guia do CameraPipeline. Neste capítulo,
                apresentaremos os fundamentos do CameraPipeline, incluindo
                informações básicas sobre Pipeline e uma visão geral das
                funcionalidades do sistema.
              </span>
              {/* <menu>
                <div className="li">
                  <button>
                    <span>$</span>
                    <span>shop</span>
                  </button>
                </div>
              </menu> */}
            </div>
          ) : vision === 1 ? (
            <div className="vision">
              <h4>Pipelines</h4>
              <div className="image-guide">
                <img
                  className="guide-shadow m-3"
                  src={gif}
                  alt="exemplo de gif"
                />
                <p> demonstração de gif para o guia</p>
              </div>
              <p>
                {" "}
                Demonstração de paragrafo para o guia de pipelines Lorem ipsum
                dolor, sit amet consectetur adipisicing elit. Ducimus, amet
                explicabo. Ea, explicabo libero architecto tempora ratione alias
                placeat sint a excepturi! Possimus, natus! Vitae pariatur quam
                cumque corporis vel? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Laudantium veniam tempora libero ullam
                numquam, iure similique! Suscipit, alias esse. Aliquam ea
                ducimus iste deleniti quibusdam quisquam optio distinctio, at
                dolor!
              </p>
            </div>
          ) : vision === 2 ? (
            <div className="vision">
              <h4>Câmeras</h4>
            </div>
          ) : vision === 3 ? (
            <div className="vision">
              <h4>Mosaicos das câmeras</h4>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UserGuideScreen;
