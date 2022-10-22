import SidebarMenu from "../../components/SideBarMenu";
import VideoStream from "../../components/VideoComponent";
import Accordion from "react-bootstrap/Accordion";
import { BsClock } from "react-icons/bs";
import "./styles.css";
import { TiFlowMerge } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

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
      digitalProcess: {
        id: 3,
        name: "Redimensionar imagem ",
        parameters: [
          {
            id: 3,
            name: "Tamanho da imagem",
            type: "STRING",
            required: false,
            index: 0,
          },
        ],
        category: "PDI",
        url: "http://localhost:5000/reduzir-ima",
      },
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
    url: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
  },
];

const modelPDIList = [
  {
    id: 1,
    modelPdi: {
      id: 3,
      name: "Redimensionar imagem ",
      parameters: [
        {
          id: 3,
          name: "Tamanho da imagem",
          type: "STRING",
          required: false,
          index: 0,
        },
      ],
      category: "PDI",
      url: "http://localhost:5000/reduzir-ima",
    },
    parameters: [
      {
        id: 1,
        name: "Tamanho da imagem",
        type: "STRING",
      },
    ],
    category: "PROCESSAMENTO",
    url: "http://localhost:5000/api",
  },
  {
    id: 13,
    name: "CROP da imagem",
    parameters: [
      {
        id: 55,
        name: "Imagem",
        type: "STRING",
      },
      {
        id: 56,
        name: "Dimensão da imagem",
        type: "STRING",
      },
      {
        id: 57,
        name: "Xmin",
        type: "NUMBER",
      },
      {
        id: 58,
        name: "Xmax",
        type: "NUMBER",
      },
      {
        id: 59,
        name: "Ymin",
        type: "NUMBER",
      },
      {
        id: 60,
        name: "Ymax",
        type: "NUMBER",
      },
    ],
    category: "EDICAO",
    url: "http://localhost:5000/crop-image",
  },
  {
    id: 14,
    name: "Reduzir tamalho da imagem",
    parameters: [
      {
        id: 61,
        name: "Imagem",
        type: "STRING",
      },
      {
        id: 62,
        name: "Tamanho da imagem",
        type: "STRING",
      },
      {
        id: 63,
        name: "Novo tamanho da imagem",
        type: "STRING",
      },
    ],
    category: "EDICAO",
    url: "http://localhost:5000/reduzir-image",
  },
];

function PipelineScreen() {
  const navigate = useNavigate();
  const [pipelineList, setPipelineList] = useState([]);
  const [pipeline, setPipeline] = useState(pipelineJson);
  const [modelPDI, setPdiList] = useState(modelPDIList);
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

  // function sortPipeline() {
  //   console.log(pipeline, "antes");
  //   var count = 1;
  //   pipeline.pdilist.map((pipe) => {
  //     if (selectedPipelineId == pipe.id) {
  //       setSelectePipelineId(count);
  //     }
  //     pipe.id = count++;
  //   });
  //   console.log(pipeline, "depois");
  // }

  function removePipeline(e) {
    var count = 0;
    pipeline.pdilist.map((pipe) => {
      if (pipe.id == e.target.id && count == 0) {
        var indice = pipeline.pdilist.findIndex(function (obj) {
          return obj.id == e.target.id;
        });
        var element = pipeline.pdilist[indice];
        pipeline.pdilist.splice(indice, 1);

        const novoEstado = Object.assign({}, pipeline);
        setPipeline(novoEstado);
        console.log(indice);
        count += 1;
      }
    });
  }

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
          modelPdi: pdi,
          valueParameters: valueParameter,
          pipelineId: 1,
        };

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
      }
    });
  }

  useEffect(() => {
    if (pipelineList[0] != undefined) {
      setPipeline(pipelineList[0]);
    }
    if (pipeline.id == "") {
      setPipeline(pipelineJson);
    }
  }, [pipelineList]);

  useEffect(() => {
    if (pipeline.id === "") {
      setPipeline(pipelineJson);
    }
  }, [update]);

  useEffect(() => {
    getPDIs();
    getCameras();
    getPipelines();
  }, []);

  const getPDIs = async () => {
    try {
      const response = await PDIService.getAll();
      setPdiList(response.content);
    } catch (error) {
      console.log("Error");
    }
  };
  const getCameras = async () => {
    try {
      const response = await CameraService.getAll();
      setVideoUrl(response.content);
    } catch (error) {
      console.log("Error");
    }
  };

  const getPipelines = async () => {
    try {
      const response = await PipelineService.getAll();

      setPipelineList(response.content);
    } catch (error) {
      console.log("Error");
    }
  };

  const refresh = () => {
    setUpdate(!update);
  };

  function flow() {
    navigate("../flow", { replace: true });
  }

  useEffect(() => {
    console.log(selectedPipelineId);
    if (document.getElementsByClassName("card-item")[0]) {
      pipeline.pdilist.map((pipe) => {
        if (pipe.id == selectedPipelineId) {
          document.getElementsByClassName(
            selectedPipelineId
          )[0].style.backgroundColor = "#f4f4f4";
        } else {
          document.getElementsByClassName(pipe.id)[0].style.backgroundColor =
            "#fdfdfd";
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

        novoEstado.pdilist[count - 1].valueParameters[indice].value =
          event.target.value;
        setPipeline(novoEstado);
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

  function handleNameChange(e) {
    var newPipeline = pipeline;
    newPipeline.name = e.target.value;
    setPipeline(newPipeline);
  }

  function handlePipeline(id) {
    pipelineList.map((pipe) => {
      if (pipe.id == id) {
        setPipeline(pipe);
        refresh();
        console.log(pipeline.name);
      }
    });
  }

  return (
    <>
      <div className="content">
        <div className="sidebar-component">
          <SidebarMenu page="pipeline" />
        </div>
        <div className="content-body">
          <div className="sticky-top contentbar">
            <nav className="navbar sticky-top navbar-light d-flex flex-row justify-content-between px-3 ">
              <input
                key={pipeline.id}
                type="text"
                onChange={(e) => handleNameChange(e)}
                defaultValue={pipeline.name}
                className="form-control-plaintext navbar-brand pipeline-name"
                style={{ color: "white" }}
              />

              <div className="grupo d-flex flex-row">
                <select
                  class="form-select-sm mx-1"
                  aria-label="Default select example"
                  onChange={(e) => {
                    handlePipeline(e.target.value);
                  }}
                >
                  {pipelineList.map((pipeline) => {
                    return (
                      <option key={pipeline.id} value={pipeline.id}>
                        {pipeline.name}
                      </option>
                    );
                  })}
                </select>
                <div class="input-group-sm d-flex mx-1">
                  <input
                    type="text"
                    className="form-control input-create"
                    placeholder="Criar nova pipeline"
                    aria-describedby="button-addon2"
                  ></input>
                  <button
                    className="btn save-btn"
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
                  <BsClock /> <text className="p-1">Histórico</text>
                </a>
                <button
                  type="button"
                  class="btn save-btn btn-sm "
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
                  <span className="warning d-flex justify-content-center">
                    O video abaixo é uma pré-visualização da pipeline
                  </span>
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
                </div>
                <div className="background-video mb-2 d-flex justify-content-center">
                  <VideoStream
                    key={pipeline.id}
                    show={true}
                    url={url}
                    width="94%"
                  />
                </div>
                <Accordion
                  defaultActiveKey={["0"]}
                  alwaysOpen
                  className="accordeon-pdi"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>PDI</Accordion.Header>
                    <Accordion.Body className="ab">
                      <ul className="list-group">
                        {modelPDI.map((pipe) => {
                          return (
                            <button
                              className="list-button list-group-item list-group-item-action py-2 w-full d-flex flex-row justify-content-between"
                              id={pipe.id}
                              key={pipe.id}
                              onClick={(e) => addPDI(e)}
                              title={
                                pipe.description + " [CLIQUE PARA ADICIONAR]"
                              }
                            >
                              {pipe.name}
                              <Adicionar id={pipe.id} text={show} />
                            </button>
                          );
                        })}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Pipeline</Accordion.Header>
                    <Accordion.Body></Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              <div className="col-4 b2">
                <div class="card my-2" key={pipeline.id}>
                  <div className="card-header pipeline-header2 ">
                    Pipeline
                    <menu>
                      <div className="li">
                        <button onClick={flow}>
                          <span>
                            <TiFlowMerge />
                          </span>
                          <span>Editar Fluxo</span>
                        </button>
                      </div>
                    </menu>
                  </div>
                  <div class="card-body pipeline-card">
                    <div className="container p-2">
                      <div className="dnd">
                        {pipeline.pdilist.map((pipe) => {
                          return (
                            <div
                              onClick={(e) => setSelectePipelineId(pipe.id)}
                              tabIndex="-1"
                              key={pipe.id}
                              id={pipe.id}
                              className={
                                pipe.id +
                                " card card-pipe d-flex flex-row justify-content-between card-item p-2 align-items-center "
                              }
                              title={pipe.name}
                            >
                              <div className="col-7">{pipe.digitalProcess.name}</div>
                              <div className="">{"ID: " + pipe.id}</div>

                              <div className="card-button">
                                <i
                                  title="Remover PDI da pipeline"
                                  id={pipe.id}
                                  onClick={(e) => {
                                    removePipeline(e);
                                  }}
                                  className="card-trash fa-solid fa-circle-minus"
                                ></i>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 b3">
                <div class="card my-2" key={pipeline.id}>
                  <div className="card-header pipeline-header">
                    Parametro da PDI
                  </div>
                  <div class="card-body pipeline-card">
                    {pipeline.pdilist.map((pipe) => {
                      if (pipe.id === selectedPipelineId) {
                        return pipe.valueParameters.map((param) => {
                          return (
                            <div
                              class="mb-3"
                              title={param.parameter.description}
                            >
                              <label
                                for="exampleFormControlInput1"
                                class="form-label m-1"
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
