import SidebarMenu from "../../components/SideBarMenu";
import VideoStream from "../../components/VideoStream";
import Accordion from "react-bootstrap/Accordion";
import "./styles.css";

const pipeline = {
  id: 1,
  user: "",
  name: "nome da pipeline",
  pipelines: [
    {
      id: 1,
      name: "a",
      category: "",
    },
    {
      id: 2,
      name: "b",
      category: "",
    },
  ],
};
const videoUrl = {
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
              <div className="pipeline-save d-flex justify-content-end ">
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
                    <option selected>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="background-video my-2">
                  <div className="video">video</div>
                </div>
                <Accordion
                  defaultActiveKey={["0"]}
                  alwaysOpen
                  className="accordeon-pdi"
                >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>PDI de edicao de imagem</Accordion.Header>
                    <Accordion.Body>
                      {pipeline.pipelines.map((pipe) => {
                        return (
                          <div className="d-flex flex-row justify-content-between card-item">
                            <div>{pipe.name}</div>
                            <div>◘ ◘</div>
                          </div>
                        );
                      })}
                      <div className="d-flex flex-row justify-content-between card-item">
                        <div>recortar imagem</div>
                        <div>◘ ◘</div>
                      </div>
                      <div className="d-flex flex-row justify-content-between card-item">
                        <div>dimencionar imagem</div>
                        <div>◘ ◘</div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>PDI de detecção</Accordion.Header>
                    <Accordion.Body>
                      <div className="d-flex flex-row justify-content-between card-item">
                        <div>detectar objeto</div>
                        <div>◘ ◘</div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>

              <div className="col-4 b2">
                <div class="card my-2">
                  <div className="card-header pipeline-header">Pipeline</div>
                  <div class="card-body pipeline-card">
                    <div className="container p-2">
                      <div className="card d-flex flex-row justify-content-between card-item p-2">
                        <div>recortar imagem</div>
                        <div className="">◘ ◘ ◘</div>
                      </div>
                      <div className="card d-flex flex-row justify-content-between card-item p-2">
                        dimencionar imagem
                        <div className="">◘ ◘ ◘</div>
                      </div>
                      <div className="card d-flex flex-row justify-content-between  p-2 pipeline-header">
                        detectar objeto
                        <div className="">◘ ◘ ◘</div>
                      </div>
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
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                      ></input>
                    </div>
                    <div class="mb-3">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Example textarea
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                    <label for="exampleColorInput" class="form-label">
                      Color picker
                    </label>
                    <input
                      type="color"
                      class="form-control form-control-color"
                      id="exampleColorInput"
                      value="#563d7c"
                      title="Choose your color"
                    ></input>
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
