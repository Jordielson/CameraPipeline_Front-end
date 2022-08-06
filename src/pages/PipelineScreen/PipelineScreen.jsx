import SidebarMenu from "../../components/SideBarMenu";
import VideoStream from "../../components/VideoStream";
import Accordion from "react-bootstrap/Accordion";
import {
  BsPlusSquare,
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsTrash,
  BsClock,
} from "react-icons/bs";
import "./styles.css";
import { useState } from "react";

const pipelineJson = {
  id: 1,
  user: "",
  name: "nome da pipeline",
  pdi: [
    {
      id: 1,
      name: "recortar imagem",
      category: "",
      parameters: [
        { name: "parametro1", type: "text" },
        { name: "parametro2", type: "text" },
      ],
    },
    {
      id: 2,
      name: "dimencionar imagem",
      category: "",
      parameters: [
        { name: "parametro1", type: "text" },
        { name: "parametro2", type: "text" },
      ],
    },
  ],
  usedPipeline: [
    {
      id: 1,
      name: "recortar imagem",
      category: "",
      parameters: [
        { name: "parametro1", type: "text" },
        { name: "parametro2", type: "text" },
      ],
    },
    {
      id: 2,
      name: "dimencionar imagem",
      category: "",
      parameters: [
        { name: "parametro1", type: "text" },
        { name: "parametro2", type: "text" },
      ],
    },
  ],
};
const videoUrlJson = {
  videos: [
    {
      id: 1,
      name: "um",
      url: "",
    },
    {
      id: 2,
      name: "dois",
      url: "",
    },
  ],
};

function PipelineScreen() {
  const [pipeline, setPipeline] = useState(pipelineJson);
  const [selectedPipelineId, setSelectePipelineId] = useState(1);
  const [videoUrl, setVideoUrl] = useState(videoUrlJson);

  function addPDI(e) {
    const newPipeline = pipeline;
    newPipeline.pdi.map((pl) => {
      if (pl.id == e.target.id) {
        const pdi = pl;
        newPipeline.usedPipeline.push(pdi);
        setPipeline(newPipeline);
      }
    });
    console.log(pipeline);
  }

  return (
    <>
      <div className="content">
        <div className="sidebar-component">
          <SidebarMenu />
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
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <div class="input-group mx-1">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  ></input>
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Button
                  </button>
                </div>
              </div>
              <div className="pipeline-save d-flex justify-content-end">
                <a href="#s" className="align-self-center px-2 history">
                  <BsClock /> Histórico
                </a>
                <button type="button" class="btn btn-success btn-sm ">
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
                    className="custom-select input inputvideo"
                    id="inputGroupSelect04"
                    aria-label="Example select with button addon"
                  >
                    {videoUrl.videos.map((video) => {
                      return <option value={videoUrl.url}>{video.name}</option>;
                    })}
                  </select>
                </div>
                <div className="background-video my-2">
                  <VideoStream />
                  {/* <div className="video">video</div> */}
                </div>
                <Accordion
                  defaultActiveKey={["0"]}
                  alwaysOpen
                  className="accordeon-pdi"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>PDI de edicao de imagem</Accordion.Header>
                    <Accordion.Body>
                      {pipeline.pdi.map((pipe) => {
                        return (
                          <div className="d-flex flex-row justify-content-between ">
                            <div>{pipe.name}</div>
                            <div>
                              <BsPlusSquare
                                id={pipe.id}
                                key={pipe.id}
                                className="card-icon"
                                onClick={(e) => addPDI(e)}
                              />
                            </div>
                          </div>
                        );
                      })}
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
                      {pipeline.usedPipeline.map((pipe) => {
                        return (
                          <div className="card d-flex flex-row justify-content-between card-item p-2">
                            <div>{pipe.name}</div>
                            <div className="">
                              <BsFillCaretUpFill className="card-icon" />
                              <BsFillCaretDownFill className="card-icon" />
                              <BsTrash className="card-icon card-trash" />
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
                    {pipeline.usedPipeline.map((pipe) => {
                      if (pipe.id === selectedPipelineId) {
                        return pipe.parameters.map((param) => {
                          return (
                            <div class="mb-3">
                              <label
                                for="exampleFormControlInput1"
                                class="form-label"
                              >
                                {param.name}
                              </label>
                              <input
                                type={param.type}
                                class="form-control"
                                id="exampleFormControlInput1"
                                placeholder={`insira um ${param.type}`}
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
