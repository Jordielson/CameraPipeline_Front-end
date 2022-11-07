import "../styles.css";
import { useState } from "react";
import { useEffect } from "react";
import SidebarMenu from "./../../../components/SideBarMenu/index";
import gif from "../../../assets/animação.gif";
import gif2 from "../../../assets/animação2.gif";

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
                Fluxo da pipeline
              </a>
            </li>
            <li className="nav-item">
              <a id="opt4" className="nav-link" onClick={() => setVision(3)}>
                Aplicar processos
              </a>
            </li>
          </ul>

          {vision === 0 ? (
            <div className="vision">
              <h4>Câmera Pipeline</h4>
              {/* <p>
                Bem-vindo ao Guia do CameraPipeline. Neste capítulo,
                apresentaremos os fundamentos do CameraPipeline, incluindo
                informações básicas sobre Pipeline e uma visão geral das
                funcionalidades do sistema.
              </p> */}
              {/* <div className="image-guide">
                <img
                  className="guide-shadow m-3"
                  src={gif2}
                  alt="exemplo de gif"
                />
                <p> demonstração de gif para o guia</p>
              </div> */}
              <p>
                Câmera Pipeline é um sistema de gerenciamento de Processos de
                Imagem (PDI) onde é possível criar requisições para APIs
                externas que recebem imagens, parâmetros e retornam a imagem
                processada, alem de poder montar uma pipeline que é uma
                sequência de instruções para vários processos serem organizados
                estratégicamente para obter a saída de imagem desejada.
              </p>
              <p>
                No Câmera Pipeline, além de criar Pipelines, também é possível
                aplicá-las em uma imagem, vídeo, ou câmera de segurança e
                visualizar o processo desejado (ou baixar o arquivo em caso de
                Imagem ou vídeo).
              </p>
              <p>
                Tambem é possível visualizar os gráficos de gerenciamento e
                consumo computacional da suas APIs utilizadas pelo serviço
              </p>
              <p>
                Navegue pelas abas do guia para saber detalhadamente como
                utilizar cada funcionalidade do sistema
              </p>
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
              {/* <h4>Pipelines</h4> */}

              <h5>Criação de PDI</h5>
              <p>
                Para criar uma pipeline é necessário criar processos de imagens
                antes.
              </p>
              <p>
                1 - No menu do sistema clique em PDIs e, no menu de PDIs, clique
                em adicionar novo PDI
              </p>
              <p>
                2 - Insíra um nome para o processo de Imagem e o URL para
                estabelecer a conexão com a API que retornará o processo{" "}
              </p>
              <p>
                3 - Crie parametros que precisam ser levados para a API pelo url
                informado clicando em Novo Parametro e clique em SALVAR para
                finalizar
              </p>
              <div className="image-guide">
                <img
                  className="guide-shadow m-3"
                  src={gif2}
                  alt="exemplo de gif"
                />
                <p>Demonstração de criação de PDI</p>
              </div>
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
