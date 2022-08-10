import SidebarMenu from "../../components/SideBarMenu";
import VideoStream from "../../components/VideoComponent";
import Accordion from "react-bootstrap/Accordion";
import {
  BsPlusSquare,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsTrash,
  BsClock,
} from "react-icons/bs";
import "./styles.css";
import { useEffect, useState } from "react";
import PDIService from "../../services/pdi";
import CameraService from "../../services/camera";
import PipelineService from "../../services/pipeline";

import { toast } from "react-toastify";

const pipelineJson = {
  id: 3,
  name: "Aumentar imagem",
  description:
    "Servico que aumentar o tamanho da imagem para um tamanho especifico determinado pelo usuario",
  creationDate: "2022-06-26T14:30:30",
  modificationTime: "2022-06-26T14:30:30",
  isActive: false,
  groupPipelineId: 1,
  cameraList: [
    {
      id: 1,
      name: "Camera 01",
      isPrivate: true,
      fpsLimiter: 60,
      url: "http://localhost:5000/api",
    },
  ],
  pdilist: [
    {
      id: 1,
      name: "Redimensionar imagem",
      valueParameters: [
        {
          id: 1,
          value: "25x30",
          parameter: {
            id: 1,
            name: "Tamanho da imagem",
            type: "STRING",
          },
        },
      ],
      pipelineId: 1,
    },
  ],
};

const videoUrlJson = [
  {
    id: 1,
    name: "Camera 01",
    isPrivate: false,
    fpsLimiter: 120,
    url: "rtsp://rtsp.stream/pattern",
  },
  {
    id: 2,
    name: "Camera 02",
    isPrivate: false,
    fpsLimiter: 90,
    url: "rtsp://rtsp.stream/pattern",
  },
];

function PipelineScreen() {
  const [pipeline, setPipeline] = useState(pipelineJson);
  const [modelPDI, setPdiList] = useState(pipelineJson.pdilist);
  const [update, setUpdate] = useState(false);
  const [selectedPipelineId, setSelectePipelineId] = useState(1);
  const [videoUrl, setVideoUrl] = useState(videoUrlJson);
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(" ");

  function Adicionar(props) {
    return (
      <div id={props.id} key={props.id} onClick={(e) => setTimeout(3000)}>
        {props.text}
      </div>
    );
  }

  function pipelineUp(e) {
    pipeline.pdilist.map((pipe) => {
      if (pipe.id == e.target.id) {
        var indice = pipeline.pdilist.findIndex(function (obj) {
          return obj.id == e.target.id;
        });
        var element = pipeline.pdilist[indice];
        pipeline.pdilist.splice(indice, 1);
        pipeline.pdilist.splice(indice - 1, 0, element);
        const novoEstado = Object.assign({}, pipeline);
        setPipeline(novoEstado);
        console.log(indice);
      }
    });
  }
  function pipelineDown(e) {
    var count = 0;
    pipeline.pdilist.map((pipe) => {
      if (pipe.id == e.target.id && count == 0) {
        var indice = pipeline.pdilist.findIndex(function (obj) {
          return obj.id == e.target.id;
        });
        var element = pipeline.pdilist[indice];
        pipeline.pdilist.splice(indice, 1);
        pipeline.pdilist.splice(indice + 1, 0, element);
        const novoEstado = Object.assign({}, pipeline);
        setPipeline(novoEstado);
        console.log(indice);
        count += 1;
      }
    });
  }
  // function removePipeline(e) {}

  function addPDI(e) {
    modelPDI.forEach((pdi) => {
      if (pdi.id == e.target.id) {
        var valueParameter = [];
        pdi.parameters.map((element) => {
          valueParameter.push({
            value: "",
            parameter: element,
          });
        });
        const newPdi = {
          id: pipeline.pdilist.length + 1,
          name: pdi.name,
          valueParameters: valueParameter,
          pipelineId: 1,
        };
        console.log("New PDI:" + newPdi);
        pipeline.pdilist.push(newPdi);
        refresh();

        toast.success(`${pdi.name} adicionado com sucesso!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        console.log(newPdi, "nova pdi");
      }
    });
  }

  useEffect(() => {
    if (pipeline.id === "") {
      setPipeline(pipelineJson);
    }
  }, [update]);

  useEffect(() => {
    getPDIs();
    getCameras();
  }, []);

  const getPDIs = async () => {
    try {
      const response = await PDIService.getAll();
      setPdiList(response);
    } catch (error) {
      console.log("Error");
    }
  };
  const getCameras = async () => {
    try {
      const response = await CameraService.getAll();
      setVideoUrl(response);
    } catch (error) {
      console.log("Error");
    }
  };

  const refresh = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    if (document.getElementsByClassName("card-item")[0]) {
      pipeline.pdilist.map((pipe) => {
        if (pipe.id == selectedPipelineId) {
          document.getElementsByClassName("card-item")[
            selectedPipelineId - 1
          ].style.backgroundColor = "#f1f1f1";
        } else {
          document.getElementsByClassName("card-item")[
            pipe.id - 1
          ].style.backgroundColor = "#fdfdfd";
        }
      });
    }
  }, [selectedPipelineId]);

  function handleChange(event, name) {
    var count = 0;
    pipeline.pdilist.map((pipe) => {
      count = count + 1;
      if (pipe.id == event.target.id) {
        const novoEstado = Object.assign({}, pipeline);
        var indice = pipe.valueParameters.findIndex(function (obj) {
          return obj.parameter.name == name;
        });
        console.log("Teste");
        console.log(indice, count - 1);

        novoEstado.pdilist[count - 1].valueParameters[indice].value =
          event.target.value;
        setPipeline(novoEstado);
        console.log(novoEstado);
      }
    });
  }

  const save = async () => {
    try {
      const response = await toast.promise(PipelineService.register(pipeline), {
        pending: "Salvando",
        success: "Salvo com sucesso! 👌",
        error: "Promise rejected 🤯",
      });
      //const response = await PipelineService.register(pipeline);

      const preview = await PipelineService.preview(response.id);
      console.log(preview);
      setUrl(preview);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="content">
        <div className="sidebar-component">
          <SidebarMenu page="pipeline" />
        </div>
        <div className="content-body">
          <div className="sticky-top contentbar">
            <nav className="navbar sticky-top navbar-light d-flex flex-row justify-content-between px-3 ">
              <a className="navbar-brand pipeline-name" href="#home">
                {pipeline.name}
              </a>
              <div className="grupo d-flex flex-row">
                <select
                  class="form-select-sm mx-1"
                  aria-label="Default select example"
                >
                  <option selected>Pipelines</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <div class="input-group mx-1">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Criar nova pipeline"
                    aria-describedby="button-addon2"
                  ></input>
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={(e) => {
                      setTimeout(1000);
                    }}
                  >
                    Criar
                  </button>
                </div>
              </div>
              <div className="pipeline-save d-flex justify-content-end">
                <a href="#s" className="align-self-center px-2 history">
                  <BsClock /> Histórico
                </a>
                <button
                  type="button"
                  class="btn btn-success btn-sm "
                  onClick={save}
                >
                  Salvar
                </button>
              </div>
            </nav>
          </div>

          <div className="container-fluid container-body">
            <div className="row row-body">
              <div className="col-4 b1 py-2">
                <div className="input-group a">
                  <select
                    onClick={(e) => setUrl(e.target.value)}
                    className="custom-select input inputvideo"
                    id="inputGroupSelect04"
                    aria-label="Example select with button addon"
                  >
                    {videoUrl.map((video) => {
                      return <option value={video.url}>{video.name}</option>;
                    })}
                  </select>
                  <span className="warning d-flex justify-content-center">
                    O video abaixo é uma pré-vizualizaçâo da pipeline
                  </span>
                </div>
                <div className="background-video my-2">
                  <VideoStream url={url} />
                </div>
                <Accordion
                  defaultActiveKey={["0"]}
                  alwaysOpen
                  className="accordeon-pdi"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>PDI de edicao de imagem</Accordion.Header>
                    <Accordion.Body className="ab">
                      {/* <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                      > */}
                      <ul className="list-group">
                        {modelPDI.map((pipe) => {
                          return (
                            <button
                              className="list-group-item list-group-item-action py-2 w-full d-flex flex-row justify-content-between"
                              id={pipe.id}
                              key={pipe.id}
                              onClick={(e) => addPDI(e)}
                              onMouseEnter={() => setShow("adicionar")}
                              onMouseLeave={() => setShow("")}
                            >
                              {pipe.name}
                              <Adicionar id={pipe.id} text={show} />
                            </button>
                          );
                        })}
                      </ul>
                      {/* </OverlayTrigger> */}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>PDI de detecção</Accordion.Header>
                    <Accordion.Body></Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              <div className="col-4 b2">
                <div class="card my-2">
                  <div className="card-header pipeline-header">Pipeline</div>
                  <div class="card-body pipeline-card">
                    <div className="container p-2">
                      {pipeline.pdilist.map((pipe) => {
                        return (
                          <div
                            onClick={(e) => setSelectePipelineId(pipe.id)}
                            tabIndex="-1"
                            key={pipe.id}
                            id={pipe.id}
                            className="card d-flex flex-row justify-content-between card-item p-2 "
                          >
                            <div>{pipe.name}</div>
                            <div>{pipe.id}</div>

                            <div className="">
                              <BsFillCaretUpFill
                                id={pipe.id}
                                onClick={(e) => {
                                  pipelineUp(e);
                                }}
                                className="card-icon"
                              />
                              <BsFillCaretDownFill
                                id={pipe.id}
                                onClick={(e) => {
                                  pipelineDown(e);
                                }}
                                className="card-icon"
                              />
                              <BsTrash
                                id={pipe.id}
                                onClick={(e) => {
                                  setTimeout(3000);
                                }}
                                className="card-icon card-trash"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 b3">
                <div class="card my-2">
                  <div className="card-header pipeline-header">
                    Parametro da PDI
                  </div>
                  <div class="card-body pipeline-card">
                    {pipeline.pdilist.map((pipe) => {
                      if (pipe.id === selectedPipelineId) {
                        return pipe.valueParameters.map((param) => {
                          return (
                            <div class="mb-3">
                              <label
                                for="exampleFormControlInput1"
                                class="form-label"
                              >
                                {param.parameter.name}
                              </label>
                              <input
                                type={param.parameter.type}
                                class="form-control"
                                id={pipe.id}
                                onChange={(e) =>
                                  handleChange(e, param.parameter.name)
                                }
                                placeholder={`insira um ${param.parameter.type}`}
                                value={param.value}
                              ></input>
                            </div>
                          );
                        });
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PipelineScreen;
