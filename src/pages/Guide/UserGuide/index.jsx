import "../styles.css";
import { useState } from "react";
import { useEffect } from "react";
import SidebarMenu from "./../../../components/SideBarMenu/index";
import gif2 from "../../../assets/animação2.gif";
import criarpdi from "../../../assets/criarpdi.gif";
import criarparam from "../../../assets/criarparam.gif";
import criarpipe from "../../../assets/criarpipe.gif";
import editarpipeline from "../../../assets/editarpipeline.gif";
import editarfluxo from "../../../assets/editarfluxo.gif";

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
              <h4>Imagem Pipeline</h4>
              <br />
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
                Imagem Pipeline é um sistema de gerenciamento de Processos de
                Imagem onde é possível criar requisições para APIs
                externas que recebem imagens, parâmetros e retornam a imagem
                processada, alem de poder montar uma pipeline que é uma
                sequência de instruções para vários processos serem organizados
                estratégicamente para obter a saída de imagem desejada.
              </p>
              <p>
                No Imagem Pipeline, além de criar Pipelines, também é possível
                aplicá-las em uma imagem, vídeo, ou câmera de segurança e
                visualizar o processo desejado (ou baixar o arquivo em caso de
                Imagem ou vídeo).
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
              <div className=" sumarycenter">
                <h4>Sumário do guia de pipeline</h4>
                <a href="#criacaopdi">Criação da PDI</a>

                <a href="#criacaoparametro">Criação de parâmetros da PDI</a>

                <a href="#criacaopipeline">Criação de Pipelines</a>

                <a href="#edicaopipeline">Edição de pipeline</a>

                <a href="#historicopipeline">
                  Historico de alterações da Pipeline
                </a>
              </div>
              <br />
              <br />
              <br />
              <h5>Criação de PDI</h5>
              <br />
              <p>
                Para criar uma pipeline é necessário criar processos de imagens
                antes.
              </p>
              <p id="criacaopdi">
                1 - No menu do sistema clique em PDIs e, no menu de PDIs, clique
                em adicionar novo PDI
              </p>
              <p>
                2 - Insíra um nome para o processo de Imagem e o URL para
                estabelecer a conexão com a API que retornará o processo{" "}
              </p>
              <div className="image-guide">
                <img
                  className="guide-shadow m-3"
                  src={criarpdi}
                  alt="exemplo de gif"
                />
                <p>Demonstração de criação de PDI</p>
              </div>
              <br />
              <p id="criacaoparametro">
                3 - Crie parametros que precisam ser levados para a API pelo url
                informado clicando em Novo Parametro e clique em SALVAR para
                finalizar
              </p>
              <div className="image-guide">
                <img
                  className="guide-shadow m-3"
                  src={criarparam}
                  alt="exemplo de gif"
                />
                <p>Demonstração de criação de parametro</p>
              </div>
              <br />
              <br />
              <h5>Criação de Pipeline</h5>
              <br />
              <p id="criacaopipeline">
                1 - No menu do sistema clique em Pipelines, no menu de
                Pipelines, clique em Criar nova, escolha um nome e clique em
                salvar.
                <br /> Em seguida voce será redirecionado para a tela de edição
                da nova pipeline
              </p>
              <p>
                2 - Na edição de pipeline, clique nas PDIs cadastradas que você
                deseja adicionar para que ela seja aplicada na lista de
                processos que serão utilizados na imagem (a ordem do processo é
                feita no fluxo de pipeline, há uma aba exclusiva para ela no
                guia)
              </p>
              <div className="image-guide">
                <img
                  className="guide-shadow m-3"
                  src={criarpipe}
                  alt="exemplo de gif"
                />
                <p>Demonstração de criação de pipeline</p>
              </div>
              <br />
              <p id="edicaopipeline">
                3 - Selecione um processo aplicado na pipeline e edite os
                parâmetros que precisam ser levados para a API com os dados que
                desejar, faça isso para todos os processos aplicados na pipeline
                e salve para finalizar a pipeline
              </p>
              <div className="image-guide">
                <img
                  className="guide-shadow m-3"
                  src={editarpipeline}
                  alt="exemplo de gif"
                />
                <p>Demonstração de edição de pipeline</p>
              </div>
              <br />
              <p id="historicopipeline">
                extra - É possivel editar, ver o historico e restaurar a versao
                de uma pipeline{" "}
              </p>
              <div className="image-guide">
                <img
                  className="guide-shadow m-3"
                  src={gif2}
                  alt="exemplo de gif"
                />
                <p>Demonstração de historico de pipeline</p>
              </div>
              <br />
            </div>
          ) : vision === 2 ? (
            <div className="vision">
              <h5>Ediçao do Fluxo</h5>
              <br />
              <p>
                O fluxo de pipeline é onde será criado uma ordem de processos
                para alcançar o resultado desejado
              </p>
              <p>
                1 - Na tela de edição de pipeline clique no botão Editar Fluxo
              </p>
              <p>
                2 - Conecte um processo em outro para definir a ordem (a saída
                da pipeline serão os processos que não possuem filhos na ediçao
                do fluxo)
              </p>
              <p>
                Após salvar, cada processo utilizado passará a ter filhos que
                seriam os processos que são ligados diretamente a ele
              </p>
              <div className="image-guide">
                <img
                  className="guide-shadow m-3"
                  src={editarfluxo}
                  alt="exemplo de gif"
                />
                <p>Demonstração de fluxo da pipeline</p>
              </div>
              <br />
            </div>
          ) : vision === 3 ? (
            <div className="vision">
              <h4>Aplicando pipelines</h4>
              <br />
              <h5>processando Imagem</h5>
              <br />
              <p>1 - No menu do sistema, clique em Processar e em Imagem </p>
              <p>2 - Selecione uma imagem do seu computador e avance</p>
              <p>
                3 - selecione a pipeline que deseja ser aplicada à imagem e verá
                o resultado da imagem processada.
              </p>
              <br />
              <h5>processando Vídeo</h5>
              <br />
              <p>1 - No menu do sistema, clique em Processar e em Video </p>
              <p>2 - Selecione um Video do seu computador e avance</p>
              <p>
                3 - selecione a pipeline que deseja ser aplicada ao vídeo e verá
                o resultado da imagem processada sobre o video.
              </p>
              <br />
              <h5>Câmeras de segurança</h5>
              <br />
              <h6>Estabelecendo conexão com a câmera</h6>
              <p>
                1 - No menu do sistema, clique em Câmeras e no menu de Câmeras,
                clique em Adicionar câmera
              </p>
              <p>
                2 - insira pelo menos o nome e o URL da câmera (dados
                obrigatórios) e salve para estabelecer a conexão
              </p>
              <p>3 - ative a camera</p>
              <br />

              <h6>Processando Câmera</h6>
              <p>1 - No menu do sistema, clique em Processar e em Câmera </p>
              <p>
                2 - Selecione uma camera anteriormente cadastrada no sistema e
                avance
              </p>
              <p>
                3 - selecione a pipeline que deseja ser aplicada à imagem e verá
                o resultado da imagem processada sobre a câmera.
              </p>
              <br />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UserGuideScreen;
