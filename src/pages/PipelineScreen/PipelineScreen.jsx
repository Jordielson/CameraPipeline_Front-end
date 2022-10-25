import SidebarMenu from "../../components/SideBarMenu";
import VideoStream from "../../components/VideoComponent";
import Accordion from "react-bootstrap/Accordion";
import { BsClock } from "react-icons/bs";
import "./styles.css";
import { TiFlowMerge } from "react-icons/ti";
import { useNavigate, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import PDIService from "../../services/pdi";
import CameraService from "../../services/camera";
import PipelineService from "../../services/pipeline";

import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

const pipelineEmpty = {
  name: "",
  description: "",
  category: "",
  active: false,
  pdilist: [
    {
      id: 0,
      index: 1,
      digitalProcess: {
        id: 16,
        name: "",
        description: "",
        category: "",
      },
      valueParameters: [
        {
          id: 0,
          value: "",
          parameter: {
            id: 0,
            name: "",
            description: "",
            type: "",
            required: false,
            index: 0,
          },
        },
      ],
      pipelineId: 0,
    },
  ],
};

function PipelineScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const [pipelineList, setPipelineList] = useState([]);

  const [pipelineName, setPipelineName] = useState("");
  const [pipeline, setPipeline] = useState(pipelineEmpty);

  const [modelPDI, setPdiList] = useState([{}]);

  const [update, setUpdate] = useState(false);
  const [selectedPipelineId, setSelectePipelineId] = useState(1);
  const [videoUrl, setVideoUrl] = useState([]);
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(" ");

  function Adicionar(props) {
    return (
      <div id={props.id} key={props.id} onClick={(e) => setTimeout(3000)}>
        {props.text}
      </div>
    );
  }

  function removePipeline(e) {
    var count = 0;
    pipeline.pdilist.map((pipe) => {
      if (pipe.index == e.target.id && count == 0) {
        var indice = pipeline.pdilist.findIndex(function (obj) {
          return obj.index == e.target.id;
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

  function addPDI(pdiID) {
    modelPDI.forEach((pdi) => {
      if (pdi.id == pdiID) {
        var valueParameter = [];
        pdi.parameters.map((element) => {
          valueParameter.push({
            value: "",
            parameter: element,
          });
        });
        const newPdi = {
          index: pipeline.pdilist.length + 1,
          digitalProcess: pdi,
          valueParameters: valueParameter,
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

  function addPipeline(pipelineID) {
    pipelineList.forEach((pipe) => {
      if (pipe.id == pipelineID) {
        const newPipeline = {
          index: pipeline.pdilist.length + 1,
          digitalProcess: pipe,
        };

        pipeline.pdilist.push(newPipeline);
        refresh();

        toast.success(`${pipe.name} adicionado com sucesso!`, {
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
    if (pipeline.id) {
      pipelineList.forEach((element) => {
        if (element.id === pipeline.id) {
          setPipeline(element);
        }
      });
    } else if (pipelineList[0]) {
      setPipeline(pipelineList[0]);
    }
  }, [pipelineList]);

  useEffect(() => {
    getPDIs();
    getCameras();
    getPipelines();

    if (location.state) {
      setPipeline(location.state.pipeline);
    }
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

  function history(pipeline) {
    navigate("../pipeline-history", { replace: true, state: { pipeline } });
  }

  useEffect(() => {
    if (document.getElementsByClassName("card-item")[0]) {
      pipeline.pdilist.map((pipe) => {
        if (pipe.index == selectedPipelineId) {
          document.getElementsByClassName(
            selectedPipelineId
          )[0].style.backgroundColor = "#f4f4f4";
        } else {
          document.getElementsByClassName(pipe.index)[0].style.backgroundColor =
            "#fdfdfd";
        }
      });
    }
  }, [selectedPipelineId]);

  function handleChange(event, name) {
    var count = 0;
    pipeline.pdilist.map((pipe) => {
      count = count + 1;
      if (pipe.index == event.target.id) {
        const novoEstado = Object.assign({}, pipeline);
        var indice = pipe.valueParameters.findIndex(function (obj) {
          return obj.parameter.name == name;
        });

        if (
          novoEstado.pdilist[count - 1].valueParameters[indice].parameter
            .type == "BOOLEAN"
        ) {
          novoEstado.pdilist[count - 1].valueParameters[indice].value =
            event.target.checked;
        } else {
          novoEstado.pdilist[count - 1].valueParameters[indice].value =
            event.target.value;
        }

        // console.log(event.target.vq5  lue);
        setPipeline(novoEstado);
        console.log(novoEstado);
      }
    });
  }

  const create = async () => {
    const request = {
      name: pipelineName,
      description: "Descrição genérica",
      category: "PIPELINE",
      active: true,
      pdilist: [],
    };
    const response = await toast.promise(PipelineService.register(request), {
      pending: "Salvando",
      success: "Salvo com sucesso! 👌",
      error: "Erro ao tentar criar a pipeline",
    });
    setPipeline(response);
    getPipelines();
  };

  const updatePipeline = async () => {
    try {
      console.log(pipeline.pdilist);
      pipeline.pdilist.map((pdi) => {
        pdi.valueParameters.map((param) => {
          if (
            param.parameter.required &&
            param.parameter.type != "BOOLEAN" &&
            param.value == ""
          ) {
            throw "requiredException";
          }
        });
      });

      const response = await toast.promise(PipelineService.update(pipeline), {
        pending: "Salvando",
        success: "Salvo com sucesso! 👌",
        error: "Erro ao tentar salvar a pipeline",
      });
      getPipelines();
      const preview = await PipelineService.preview(response.id);
      //Preview comentada temporariamente pra o desenvolvimento
      //setUrl(preview);
    } catch (error) {
      if (error == "requiredException") {
        toast.error(
          <text id="toastMsg">parametros obrigatórios não preenchidos</text>
        );
      }
    }
  };

  function handleNameChange(e) {
    setPipeline((prevState) => {
      return { ...prevState, name: e };
    });
  }

  function handlePipeline(id) {
    pipelineList.map((pipe) => {
      if (pipe.id == id) {
        setPipeline(pipe);
        refresh();
      }
    });
    setPipelineName("");
  }

  const deletePipeline = async () => {
    try {
      await toast.promise(PipelineService.deletePipeline(pipeline.id), {
        pending: "Deletando",
        success: "Deletado com sucesso! 👌",
        error: "Erro ao tentar deletar o pipeline",
      });
      setPipeline(pipelineEmpty);
      getPipelines();
    } catch (error) {
      console.log(error);
    }
  };

  const checkHandler = async (pipeline) => {
    try {
      await PipelineService.switchActive({
        id: pipeline.id,
        active: !pipeline.active,
      });
      getPipelines();
    } catch (error) {
      toast.error(
        <text id="toastMsg">Não foi possível ativar/desativar a pipeline</text>
      );
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
            <nav
              className={
                pipelineList.length > 0
                  ? "navbar sticky-top navbar-light d-flex flex-row justify-content-between px-3 "
                  : "navbar sticky-top navbar-light d-flex flex-row justify-content-center px-3 "
              }
            >
              {pipelineList.length > 0 && (
                <input
                  key={pipeline.id}
                  type="text"
                  onChange={(e) => handleNameChange(e.target.value)}
                  value={pipeline.name}
                  placeholder="Insira o nome da pipeline..."
                  className="form-control-plaintext navbar-brand pipeline-name"
                  style={{ color: "white" }}
                />
              )}

              <div className="grupo d-flex flex-row">
                {pipelineList.length > 0 && (
                  <select
                    id="pipelines-select"
                    role="button"
                    value={pipeline.id}
                    class="form-select-sm mx-1"
                    aria-label="Default select example"
                    onChange={(e) => handlePipeline(e.target.value)}
                  >
                    {pipelineList.map((pipeline) => {
                      return (
                        <option key={pipeline.id} value={pipeline.id}>
                          {pipeline.name}
                        </option>
                      );
                    })}
                  </select>
                )}

                <div class="input-group-sm d-flex mx-1">
                  <input
                    type="text"
                    className="form-control input-create"
                    placeholder="Criar nova pipeline"
                    aria-describedby="button-addon2"
                    value={pipelineName}
                    onChange={(e) => setPipelineName(e.target.value)}
                  ></input>
                  <button
                    className="btn save-btn  btn-create"
                    type="button"
                    id="button-addon2"
                    onClick={(e) => {
                      create();
                    }}
                  >
                    Criar
                  </button>
                </div>
              </div>
              {pipelineList.length > 0 && (
                <div className="pipeline-save d-flex justify-content-end">
                  <div style={{ display: "flex", marginRight: 10 }}>
                    <Form.Check
                      style={{ marginLeft: 6, marginTop: 4 }}
                      role="button"
                      type="switch"
                      title="ativar/desativar pipeline"
                      checked={pipeline.active}
                      id={pipeline.id}
                      onChange={(e) => {
                        checkHandler(pipeline);
                      }}
                    />
                  </div>
                  <a class="p-delete" onClick={deletePipeline}>
                    Excluir
                  </a>
                  <a
                    role={"button"}
                    onClick={() => history(pipeline)}
                    className="align-self-center px-2 history"
                  >
                    <BsClock /> <text className="p-1">Histórico</text>
                  </a>
                  <button
                    type="button"
                    class="btn save-btn btn-sm "
                    onClick={updatePipeline}
                  >
                    Salvar
                  </button>
                </div>
              )}
            </nav>
          </div>
          {pipelineList.length > 0 ? (
            <div className="container-fluid container-body">
              <div className="row row-body">
                <div className="col-4 b1 py-2">
                  <div className="input-group a">
                    <select
                      role="button"
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
                  <div className="background-video mb-0 d-flex justify-content-center">
                    <VideoStream
                      key={pipeline.id}
                      show={true}
                      url={url}
                      width="94%"
                    />
                  </div>
                  <span className="warning d-flex justify-content-center mb-2">
                    O video acima é uma pré-visualização da pipeline
                  </span>
                  <Accordion
                    defaultActiveKey={["0"]}
                    flush
                    className="accordeon-pdi"
                  >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>PDI</Accordion.Header>
                      <Accordion.Body className="ab">
                        <ul className="list-group list-group-pipeline">
                          {modelPDI.map((pipe) => {
                            return (
                              <button
                                className="list-button list-group-item list-group-item-action py-2 w-full d-flex flex-row justify-content-between"
                                id={pipe.id}
                                key={pipe.id}
                                onClick={(e) => addPDI(e.target.id)}
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
                      <Accordion.Body className="ab">
                        <ul className="list-group list-group-pipeline">
                          {pipelineList.map((pipe) => {
                            return (
                              <>
                                {pipe.id !== pipeline.id ? (
                                  <button
                                    className="list-button list-group-item list-group-item-action py-2 w-full d-flex flex-row justify-content-between"
                                    id={pipe.id}
                                    key={pipe.id}
                                    onClick={(e) => addPipeline(e.target.id)}
                                  >
                                    {pipe.name}
                                    <Adicionar id={pipe.id} text={show} />
                                  </button>
                                ) : null}
                              </>
                            );
                          })}
                        </ul>
                      </Accordion.Body>
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
                                onClick={(e) =>
                                  setSelectePipelineId(pipe.index)
                                }
                                tabIndex="-1"
                                key={pipe.index}
                                id={pipe.index}
                                className={
                                  pipe.index +
                                  " card card-pipe d-flex flex-row justify-content-between card-item p-2 align-items-center "
                                }
                                title={pipe.name}
                              >
                                <div className="col-7">
                                  {pipe.digitalProcess.name}
                                </div>
                                <div className="">{"ID: " + pipe.index}</div>

                                <div className="card-button">
                                  <i
                                    title="Remover PDI da pipeline"
                                    id={pipe.index}
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
                        if (
                          pipe.index === selectedPipelineId &&
                          pipe.digitalProcess.category !== "PIPELINE"
                        ) {
                          return pipe.valueParameters.map((param) => {
                            if (param.parameter.type == "BOOLEAN") {
                              return (
                                <Form>
                                  <Form.Group className="mb-3 mx-1">
                                    <Form.Check
                                      id={pipe.index}
                                      type="checkbox"
                                      label={param.parameter.name}
                                      defaultChecked={
                                        param.value == "true" ? true : false
                                      }
                                      onChange={(e) =>
                                        handleChange(e, param.parameter.name)
                                      }
                                    />
                                  </Form.Group>
                                </Form>
                              );
                            }
                            return (
                              <div
                                class="mb-3"
                                title={param.parameter.description}
                              >
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label m-1"
                                  title={param.parameter.description}
                                >
                                  {param.parameter.name}
                                  {param.parameter.required && (
                                    <span
                                      className="required"
                                      title="Campo obrigatório"
                                    >
                                      *
                                    </span>
                                  )}
                                </label>
                                <input
                                  type={param.parameter.type}
                                  class="form-control"
                                  id={pipe.index}
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
          ) : (
            <div className="empty-pipeline">
              <h2> Não há nenhuma pipeline criada </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default PipelineScreen;
