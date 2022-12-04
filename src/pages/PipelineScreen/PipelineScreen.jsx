import SidebarMenu from "../../components/SideBarMenu";
import VideoStream from "../../components/VideoComponent";
import ConfirmationModal from "../../components/ConfirmationModal";
import Accordion from "react-bootstrap/Accordion";
import { BsClock } from "react-icons/bs";
import { AiOutlineLeft } from "react-icons/ai";
import "./styles.css";
import { TiFlowMerge } from "react-icons/ti";
import { useNavigate, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import PDIService from "../../services/pdi";
import CameraService from "../../services/camera";
import PipelineService from "../../services/pipeline";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import ValueParameterService from "../../services/value_parameter";

const pipelineEmpty = {
  id: 0,
  name: "",
  description: "",
  category: "",
  active: false,
  pdilist: [
    {
      id: 0,
      index: 1,
      children: [2, 3],
      position: undefined,
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

  const [pipeline, setPipeline] = useState(pipelineEmpty);

  const [modelPDI, setPdiList] = useState([{}]);

  const [update, setUpdate] = useState(false);
  const [selectedPipelineId, setSelectePipelineId] = useState(1);
  const [videoUrl, setVideoUrl] = useState([]);
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(" ");
  const [pdiQuery, setPdiQuery] = useState("");
  const [pipelineQuery, setPipelineQuery] = useState("");
  const [activeSearchPdi, setActiveSearchPdi] = useState(false);
  const [activeSearchPipeline, setActiveSearchPipeline] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [info, setInfo] = useState(false);

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
        count += 1;
      }
    });
  }

  function getIndex() {
    let max = 0;
    pipeline.pdilist.forEach((element) => {
      if (element.index > max) {
        max = element.index;
      }
    });
    // if (pipeline.pdilist.length > 0) {
    //   return pipeline.pdilist[pipeline.pdilist.length - 1].index + 1;
    // }
    return max + 1;
  }

  function addPDI(pdiID) {
    // let novoEstado = Object.assign({}, pipeline);
    // novoEstado.pdilist = novoEstado.pdilist.sort((a, b) => a.index - b.index);
    // console.log(novoEstado.pdilist);
    // setPipeline(novoEstado);
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
          index: getIndex(),
          digitalProcess: pdi,
          valueParameters: valueParameter,
        };

        pipeline.pdilist.push(newPdi);
        refresh();

        toast.success(
          <span id="toastMsg">{pdi.name} adicionado com sucesso!</span>,
          {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    });
  }

  async function addPipeline(pipelineID) {
    const params = {
      parentPipelineID: pipeline.id,
      childPipelineID: pipelineID,
    };
    try {
      const response = await PipelineService.verifyLoop(params);
      if (response.valid) {
        pipelineList.forEach((pipe) => {
          if (pipe.id == pipelineID) {
            const newPipeline = {
              index: getIndex(),
              digitalProcess: pipe,
              valueParameters: [],
            };

            pipeline.pdilist.push(newPipeline);
            refresh();

            toast.success(
              <span id="toastMsg">{pipe.name} adicionado com sucesso!</span>,
              {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              }
            );
          }
        });
      } else {
        toast.error(
          <span id="toastMsg">
            Erro de Loop - A pipeline {pipeline.name} já está sendo utilizada
            por essa pipeline
          </span>
        );
      }
    } catch (error) {
      toast.error(<span id="toastMsg">Erro interno</span>);
    }
  }

  // useEffect(() => {
  //   if (pipeline.id !== 0) {
  //     pipelineList.forEach((element) => {
  //       if (element.id === pipeline.id) {
  //         setPipeline(element);
  //       }
  //     });
  //   } else if (pipelineList[0]) {
  //     setPipeline(pipelineList[0]);
  //   }
  // }, [pipelineList]);

  // useEffect(() => {
  //   let novoEstado = Object.assign({}, pipeline);
  //   novoEstado.pdilist = novoEstado.pdilist.sort((a, b) => a.index - b.index);
  //   console.log(novoEstado.pdilist);
  //   setPipeline(novoEstado);
  // }, [location]);

  useEffect(() => {
    getPDIs();
    getCameras();
    getPipelines();

    if (location.state) {
      setPipeline(location.state.pipeline);
      // let novoEstado = Object.assign({}, location.state.pipeline);
      // novoEstado.pdilist = novoEstado.pdilist.sort((a, b) => a.index - b.index);
      // console.log(novoEstado.pdilist);
      // setPipeline(novoEstado);
    } else {
      navigate("../pipeline-home");
    }
  }, []);

  const getPDIs = async () => {
    try {
      const response = await PDIService.getAll();
      setPdiList(response.content);
      setActiveSearchPdi(false);
    } catch (error) {
      alert("Error");
    }
  };
  const getCameras = async () => {
    try {
      const response = await CameraService.getAll();
      setVideoUrl(response.content);
    } catch (error) {
      alert("Error");
    }
  };

  const getPipelines = async () => {
    try {
      const response = await PipelineService.getAll();
      setPipelineList(response.content);
      setActiveSearchPipeline(false);
      response.content.forEach(element => {
        if(element.id === pipeline.id){
          setPipeline(element);
        }
      });
    } catch (error) {
      alert("Error");
    }
  };

  const refresh = () => {
    setUpdate(!update);
  };

  function flow() {
    try {
      validateParam();
      navigate("../flow", { replace: true, state: { pipeline } });
    } catch (error) {
      if (error == "requiredException") {
        toast.error(
          <span id="toastMsg">parametros obrigatórios não preenchidos</span>
        );
      } else {
      }
    }
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
        } else if (
          novoEstado.pdilist[count - 1].valueParameters[indice].parameter
            .type == "FILE"
        ) {
          let file = event.target.files[0];
          novoEstado.pdilist[count - 1].valueParameters[indice].value = file;
        } else {
          novoEstado.pdilist[count - 1].valueParameters[indice].value =
            event.target.value;
        }

        setPipeline(novoEstado);
      }
    });
  }

  function validateParam() {
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
  }

  const updatePipeline = async () => {
    try {
      validateParam();
      await Promise.all(
        pipeline.pdilist.map(async (element) => {
          await Promise.all(
            element.valueParameters.map(async (value) => {
              if (
                value.parameter.type == "FILE" &&
                typeof value.value == "object"
              ) {
                const formData = new FormData();
                formData.append("file", value.value);
                const response = await ValueParameterService.upload(formData);
                value.value = response.id;
              }
            })
          );
        })
      );

      const response = await toast.promise(PipelineService.update(pipeline), {
        pending: {
          render({ data }) {
            return <span id="toastMsg">Salvando</span>;
          },
        },
        success: {
          render({ data }) {
            return <span id="toastMsg">Salvo com sucesso!</span>;
          },
        },
        error: {
          render({ data }) {
            return <span id="toastMsg">Erro ao tentar salvar a pipeline</span>;
          },
        },
      });
      // getPipelines();
      const preview = await PipelineService.preview(response.id);
      //Preview comentada temporariamente pra o desenvolvimento
      //setUrl(preview);
    } catch (error) {
      if (error == "requiredException") {
        toast.error(
          <span id="toastMsg">parametros obrigatórios não preenchidos</span>
        );
      }
    }
  };

  function handleNameChange(e) {
    setPipeline((prevState) => {
      return { ...prevState, name: e };
    });
  }

  // function handlePipeline(id) {
  //   pipelineList.map((pipe) => {
  //     if (pipe.id == id) {
  //       setPipeline(pipe);
  //       refresh();
  //     }
  //   });
  // }

  useEffect(() => {
    info ? deletePipeline() : setInfo(false);
  }, [info]);

  const deletePipeline = async () => {
    try {
      await toast.promise(PipelineService.deletePipeline(pipeline.id), {
        pending: {
          render({ data }) {
            return <span id="toastMsg">Deletando</span>;
          },
        },
        success: {
          render({ data }) {
            return <span id="toastMsg">Deletado com sucesso! 👌</span>;
          },
        },
      });
      setPipeline(pipelineEmpty);
      navigate("../pipeline-home");

      // getPipelines();
    } catch (error) {
      let errorMessage = "";
      switch (error.response.data.code) {
        case "PIPELINE_USED":
          errorMessage = "Pipeline está sendo utilizada";
          break;
        default:
          errorMessage = "Erro ao tentar deletar o pipeline";
          break;
      }
      toast.error(<span id="toastMsg">{errorMessage}</span>);
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
        <span id="toastMsg">Não foi possível ativar/desativar a pipeline</span>
      );
    }
  };

  async function searchPdi(e) {
    if (e.key === "Enter") {
      const pdiName = {
        name: pdiQuery,
      };
      try {
        const response = await PDIService.search(pdiName);
        setPdiQuery("");
        setPdiList(response.content);
        setActiveSearchPdi(true);
      } catch (error) {
        toast.error(<span id="toastMsg">Não foi possível pesquisar</span>);
      }
    }
  }

  async function searchPipeline(e) {
    if (e.key === "Enter") {
      const pipelienName = {
        name: pipelineQuery,
      };
      try {
        const response = await PipelineService.search(pipelienName);
        setPipelineQuery("");
        setPipelineList(response.content);
        setActiveSearchPipeline(true);
      } catch (error) {
        toast.error(<span id="toastMsg">Não foi possível pesquisar</span>);
      }
    }
  }

  const clickMethod = (name) => {
    ////if(confirm("Are you sure to delete "+name)) {
    console.log("Implement delete functionality here");
    // }
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
              <div className="pipeline-name d-flex">
                <h6
                  className="backbutton"
                  onClick={(e) => {
                    navigate("../pipeline-home");
                  }}
                  title="voltar"
                >
                  <AiOutlineLeft style={{ color: "white" }} title="voltar" />
                </h6>
                {pipelineList.length > 0 && (
                  <input
                    key={pipeline.id}
                    type="text"
                    onChange={(e) => handleNameChange(e.target.value)}
                    value={pipeline.name}
                    placeholder="Insira o nome da pipeline..."
                    className="form-control-plaintext navbar-brand name-edit px-2"
                    style={{ color: "white" }}
                  />
                )}
              </div>

              {/* <div className="grupo d-flex flex-row">
                {pipelineList.length > 0 && (
                  <select
                    id="pipelines-select"
                    role="button"
                    value={pipeline.id}
                    class="form-select-sm mx-1 select-pipeline"
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
                  <button
                    className="btn save-btn"
                    type="button"
                    id="button-addon2"
                    onClick={() => {
                      create();
                    }}
                  >
                    Criar
                  </button>
                </div>
              </div> */}
              {pipelineList.length > 0 && (
                <div className="pipeline-save d-flex justify-content-end">
                  <div
                    className="switch"
                    style={{ display: "flex", marginRight: 15 }}
                  >
                    <Form.Check
                      style={{ marginLeft: 6, marginTop: 4 }}
                      label="Ativar/Desativar"
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
                  <a
                    role={"button"}
                    onClick={() => history(pipeline)}
                    className="align-self-center px-2 history"
                  >
                    <BsClock className="m-1" /> Histórico
                  </a>
                  <a
                    type="button"
                    className="btn btn-light btn-sm btn-excluir"
                    onClick={() => setShowConfirmation(true)}
                  >
                    Excluir
                  </a>
                  <button
                    type="button"
                    className="btn save-btn btn-sm "
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
                      onChange={(e) => setUrl(e.target.value)}
                      className="custom-select input inputvideo"
                      id="inputGroupSelect04"
                      aria-label="Example select with button addon"
                    >
                      {videoUrl.map((video) => {
                        return (
                          <option key={video.url} value={video.url}>
                            {video.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="video-container">
                    <div className="background-video mb-0 d-flex justify-content-center">
                      <VideoStream
                        key={pipeline.id}
                        show={true}
                        url={url}
                        width="94%"
                      />
                    </div>
                    <span className="warning d-flex justify-content-center mb-2">
                      este video é uma pré-visualização da pipeline
                    </span>
                  </div>
                  <Accordion
                    defaultActiveKey={["0"]}
                    flush
                    className="accordeon-pdi"
                  >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header className="">
                        <div className="acordeon-header">
                          <span className="pdispan">Serviço</span>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="ab">
                        <div className="">
                          <span className="fa fa-search fa-sm form-control-pdi icon-search"></span>

                          <input
                            type="text"
                            className="form-control form-input-pdi acordeon-header-width "
                            placeholder="pesquisar serviço"
                            value={pdiQuery}
                            onChange={(e) => setPdiQuery(e.target.value)}
                            onKeyDown={searchPdi}
                          />
                        </div>
                        {activeSearchPdi && (
                          <div className="show-results">
                            <p onClick={(e) => getPDIs()}>
                              mostrar todos os resultados
                            </p>
                          </div>
                        )}
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
                      <Accordion.Header>
                        <div className="acordeon-header">
                          <span className="pipelinespan">Pipeline</span>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="ab">
                        <div className="">
                          <span className="fa fa-search fa-sm form-control-pdi icon-search"></span>

                          <input
                            type="text"
                            className="form-control form-input-pdi acordeon-header-width "
                            placeholder="pesquisar pipeline"
                            value={pipelineQuery}
                            onChange={(e) => setPipelineQuery(e.target.value)}
                            onKeyDown={searchPipeline}
                          />
                        </div>
                        {activeSearchPipeline && (
                          <div className="show-results">
                            <p onClick={(e) => getPipelines()}>
                              mostrar todos os resultados
                            </p>
                          </div>
                        )}
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
                  <div className="card my-2" key={pipeline.id}>
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
                    <div className="card-body pipeline-card">
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
                                    title="Remover serviço da pipeline"
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
                  <div className="card my-2" key={pipeline.id}>
                    <div className="card-header pipeline-header">
                      Parametro da serviço
                    </div>
                    <div className="card-body pipeline-card-parameter">
                      {pipeline.pdilist.map((pipe) => {
                        if (
                          pipe.index === selectedPipelineId &&
                          pipe.digitalProcess.category !== "PIPELINE"
                        ) {
                          return pipe.valueParameters.map((param) => {
                            if (param.parameter.type == "BOOLEAN") {
                              return (
                                <div className="form-check" key={param.id}>
                                  <input
                                    id={pipe.index}
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultChecked={
                                      param.value == "true" ||
                                      param.value == true
                                        ? true
                                        : false
                                    }
                                    onChange={(e) =>
                                      handleChange(e, param.parameter.name)
                                    }
                                  />
                                  <label className="form-check-label">
                                    {param.parameter.name}
                                  </label>
                                </div>
                              );
                            }
                            return (
                              <div
                                className="mb-3"
                                title={param.parameter.description}
                                key={param.id}
                              >
                                <label
                                  for="exampleFormControlInput1"
                                  className="form-label m-1"
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
                                  className="form-control"
                                  id={pipe.index}
                                  onChange={(e) =>
                                    handleChange(e, param.parameter.name)
                                  }
                                  placeholder={`insira um ${param.parameter.type}`}
                                  value={
                                    param.parameter.type == "FILE"
                                      ? ""
                                      : param.value
                                  }
                                  // value={param.type == "FILE" && ""}
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
            // <div className="empty-pipeline">
            //   <h1> Carregando pipeline... </h1>
            // </div>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
        </div>
      </div>
      <ConfirmationModal
        show={showConfirmation}
        onShowChange={setShowConfirmation}
        info={setInfo}
      />
    </>
  );
}
export default PipelineScreen;
