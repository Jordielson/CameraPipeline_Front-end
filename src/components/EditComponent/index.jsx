import { Step, StepLabel } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import Styles from "./image.module.css";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import ImageService from "../../services/image";
import VideoService from "../../services/video";
import CameraService from "../../services/camera";
import CameraList from "../CameraList";
import VideoComponent from "../VideoComponent";
import PipelineService from "../../services/pipeline";
import PaginationComponent from "../PaginationComponent";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import logo2 from "../../assets/Pulse-1s-200px.svg";

function EditComponent(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState();
  const [camera, setCamera] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [pipelineList, setPipelineList] = useState([]);
  const [pipeline, setPipeline] = useState();
  const [returnedImage, setReturnedImage] = useState();
  const [returnedVideo, setReturnedVideo] = useState();
  const [video, setVideo] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [cameraId, setCameraId] = useState();
  const [generatedImageUrl, setgeneratedImageUrl] = useState();
  const [generatedVideoUrl, setgeneratedVideoUrl] = useState();
  const [generatedCameraUrl, setgeneratedCameraUrl] = useState();
  const [showCamera, setShowCamera] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    if (activeStep === 1) {
      getPipeline();
    }
  }, [activeStep]);

  useEffect(() => {
    const params = {
      page: currentPage - 1,
    };
    getPipeline(params);
  }, [currentPage]);

  function nextStep() {
    if (
      // imageUrl != null ||
      image != null ||
      // videoUrl != null ||
      video != null ||
      cameraId != null
    ) {
      if (activeStep < 2) {
        setActiveStep((currentStep) => currentStep + 1);
      }
    } else {
      toast.error(
        <span id="toastMsg">
          Selecione um(a) {props.type} antes de prosseguir
        </span>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  }
  function previousStep() {
    setLoading2(false);
    setShowCamera(false);
    if (activeStep > 0) {
      if (activeStep == 2) {
        if (props.type == "imagem") {
          ImageService.delete(returnedImage.id);
        }
        if (props.type == "video") {
          VideoService.delete(returnedVideo.id);
        }
      }
      setActiveStep((currentStep) => currentStep - 1);
    }
    if (activeStep == 1) {
      setCameraId(null);
      setImage(null);
      setVideo(null);
      // setImageUrl(null);
      // setVideoUrl(null);
    }
  }

  async function downloadImage() {
    if (props.type == "imagem") {
      fetch(generatedImageUrl, {
        method: "GET",
        headers: {},
      })
        .then((response) => {
          response.arrayBuffer().then(function (buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              "image." + returnedImage.format.split("/")[1]
            ); //or any other extension
            document.body.appendChild(link);
            link.click();
          });
        })
        .catch((error) => {
          var errorMessage = "";
          switch (error.response.data.code) {
            case "ERR_INTERNAL_SERVER_ERROR":
              errorMessage = "Ocorreu um erro no servidor";
              break;
            default:
              errorMessage = "Erro ao baixar a imagem";
              break;
          }
          toast.error(<span id="toastMsg">{errorMessage}</span>);
        });

      // const imageByte = await ImageService.getImage(returnedImage);

      // var blob = new Blob(
      //   [
      //     "https://cdn.eso.org/images/publicationjpg/eso1907a.jpg"
      //   ], { type: "image/*" });
      // saveAs(blob, "image.png");
      // console.log(blob);
    }
  }

  async function generateContent(pipelineId) {
    if (props.type == "imagem") {
      const data = new FormData();
      data.append("image", image);
      data.append("pipeline", pipelineId);
      const returnedImage = await ImageService.generateImage(data);
      setgeneratedImageUrl(returnedImage.url);
      setReturnedImage(returnedImage);
      nextStep();
      setLoading2(false);
    } else if (props.type == "video") {
      const data = new FormData();
      data.append("video", video);
      data.append("pipeline", pipelineId);
      const response = await VideoService.generateVideo(data);
      setReturnedVideo(response);
      setgeneratedVideoUrl(response.url);

      nextStep();
      setLoading2(false);
    } else {
      CameraService.generateCamera({
        pipelineId: pipelineId,
        cameraId: cameraId,
      })
        .then((response) => {
          setCamera(response);

          setgeneratedCameraUrl(response.url);
          setShowCamera(true);
          nextStep();
          setLoading2(false);
        })
        .catch((error) => {
          var errorMessage = "";
          switch (error.response.data.code) {
            case "ERR_INTERNAL_SERVER_ERROR":
              errorMessage = "Ocorreu um erro no servidor";
              break;
            case "ERR_PIPELINE_ALREADY_APPLIED":
              errorMessage = "Pipeline já foi aplicada a esta câmera";
              break;
            case "ERR_CAMERA_PIPELINE_ALREADY_EXISTS":
              errorMessage = "Já existe uma câmera com esse pipeline";
              break;
            default:
              errorMessage = "Erro ao buscar as cameras";
              break;
          }
          setLoading2(false);
          toast.error(<span id="toastMsg">{errorMessage}</span>);
        });
    }
  }

  function handlePipeline(e) {
    setLoading2(true);
    pipelineList.map((item) => {
      if (item.id == e.target.id) {
        setPipeline(item);
        generateContent(item.id);
      }
    });
  }

  // function nextStep() {
  //   setActiveStep((currentStep) => currentStep + 1);
  // }

  async function getPipeline(params) {
    setLoading(true);
    PipelineService.getAll(params)
      .then((response) => {
        setPipelineList(response.content);
        setTotalPages(response.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        var errorMessage = "";
        switch (error.response.data.code) {
          case "ERR_INTERNAL_SERVER_ERROR":
            errorMessage = "Ocorreu um erro no servidor";
            break;
          default:
            errorMessage = "Erro ao buscar os pipeline";
            break;
        }
        toast.error(<span id="toastMsg">{errorMessage}</span>);
      });
  }

  function saveCamera() {
    CameraService.register(camera)
      .then(() => {
        toast.success(
          <span id="toastMsg">Pipeline aplicada a câmera com sucesso</span>
        );
      })
      .catch((error) => {
        var errorMessage = "";
        switch (error.response.data.code) {
          case "ERR_NOT_FOUND":
            errorMessage = "Camera ou pipeline não encontrado";
            break;
          case "ERR_INAVALID_ARGUMENT":
            errorMessage = "Camera inválida";
            break;
          case "ERR_INTERNAL_SERVER_ERROR":
            errorMessage = "Ocorreu um erro no servidor";
            break;
          default:
            errorMessage = "Erro ao salvar a camera com pipeline";
            break;
        }
        toast.error(<span id="toastMsg">{errorMessage}</span>);
      });
  }

  function handleEnd() {
    if (activeStep == 2) {
      if (props.type == "imagem") {
        ImageService.delete(returnedImage.id);
      }
      if (props.type == "video") {
        VideoService.delete(returnedVideo.id);
      }
    }
    setImage(null);
    setImageUrl(null);
    setVideo(null);
    setVideoUrl(null);
    setActiveStep((currentStep) => 0);
  }

  function checkFiles(e) {
    let fup = document.getElementById("content");
    let fileName = fup.value;
    let ext = fileName.substring(fileName.lastIndexOf(".") + 1);
    ext = ext.toLowerCase();

    console.log(ext, e);
    if (e == "imagem" && (ext == "jpeg" || ext == "png" || ext == "jpg")) {
      return true;
    } else if (e == "video" && (ext == "mp4" || ext == "wmv" || ext == "gif")) {
      return true;
    } else {
      fup.value = null;
      return false;
    }
  }

  function handleImage(e) {
    if (props.type == "imagem") {
      if (checkFiles("imagem")) {
        setImage(e.target.files[0]);
      } else {
        toast.error(<span id="toastMsg">Formato de Imagem inválida</span>, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      if (checkFiles("video")) {
        setVideo(e.target.files[0]);
      } else {
        toast.error(<span id="toastMsg">Formato de video inválido</span>, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  }
  function handleUrl(e) {
    if (props.type == "imagem") {
      setImageUrl(e.target.value);
    } else {
      setVideoUrl(e.target.value);
    }
  }

  function handleCameraId(e) {
    setCameraId(e.id);
    // toast.success(
    //   "A câmera de nome " + e.name + " foi selecionada com sucesso",
    //   {
    //     position: "top-right",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //   }
    // );
  }

  const theme = {
    "& .MuiStepLabel-root .Mui-completed": {
      color: "#ff0072", // circle color (COMPLETED)
    },
    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
      color: "#ff0072", // Just text label (COMPLETED)
    },
    "& .MuiStepLabel-root .Mui-active": {
      color: "#ff0072", // circle color (ACTIVE)
    },
    "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
      color: "common.black", // Just text label (ACTIVE)
    },
    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
      fill: "white", // circle's number (ACTIVE)
    },
  };

  return (
    <div className="content-body">
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <div className={Styles.content}>
        <div className={Styles.grid0}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            className={Styles.grid1}
          >
            <Step sx={theme} className={Styles.step}>
              <StepLabel>Selecionar {props.type}</StepLabel>
            </Step>
            <Step sx={theme}>
              <StepLabel>Selecionar Pipeline</StepLabel>
            </Step>
            <Step sx={theme}>
              <StepLabel>Resultado</StepLabel>
            </Step>
          </Stepper>
        </div>
        <div className={Styles.stepContent}>
          {(activeStep == 0 && (
            <Form.Group
              controlId="formFile"
              className="d-flex flex-column align-items-center "
            >
              <h2 className={Styles.stepTitle}>Selecione o arquivo</h2>

              {props.type !== "camera" ? (
                <>
                  <Form.Control
                    type="file"
                    size="sm"
                    id="content"
                    accept={props.format}
                    className={Styles.input + " inputPerson"}
                    onChange={(e) => handleImage(e)}
                  />
                </>
              ) : (
                <CameraList sendCamera={(e) => handleCameraId(e)} />
              )}
            </Form.Group>
          )) ||
            (activeStep == 1 && (
              <div className={"d-flex flex-column  "}>
                {loading2 ? (
                  <div className={Styles.logo2Div}>
                    <img
                      src={logo2}
                      alt="Carregando..."
                      className={Styles.load2}
                    />
                  </div>
                ) : (
                  <>
                    <h2
                      className={
                        (Styles.stepTitle = "d-flex align-self-center")
                      }
                    >
                      Selecione uma pipeline
                    </h2>
                    <ListGroup className={Styles.list}>
                      {pipelineList.map((item) => {
                        return (
                          <ListGroup.Item
                            id={item.id}
                            action
                            onClick={(e) => handlePipeline(e)}
                          >
                            {item.name}
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                    <PaginationComponent
                      totalPages={totalPages}
                      currentPage={currentPage}
                      setPage={(e) => setCurrentPage(e)}
                    />
                  </>
                )}
              </div>
            )) ||
            (activeStep == 2 && (
              <div className={Styles.stepdownload}>
                <h5>Resultado:</h5>
                <div>
                  {props.type == "imagem" && (
                    <img
                      id="ItemPreview"
                      className={Styles.image}
                      src={generatedImageUrl}
                      alt=""
                    />
                  )}
                  {props.type == "video" && (
                    <video
                      className={Styles.image}
                      src={generatedVideoUrl}
                      autoplay
                      poster=""
                      controls
                    >
                      Desculpa, o seu navegador não suporta vídeos incorporados,
                      mas você pode <a href="videofile.ogg">baixá-lo</a>e
                      assistir pelo seu reprodutor de mídia favorito!
                    </video>
                  )}
                  {props.type == "imagem" && (
                    <button
                      className={"btn btn-color " + Styles.downloadButton}
                      onClick={downloadImage}
                    >
                      Baixar
                    </button>
                  )}
                  {props.type == "camera" && (
                    <div
                      style={{ width: "60%", maxHeight: "70%", margin: "auto" }}
                    >
                      <>
                        <VideoComponent
                          show={showCamera}
                          url={generatedCameraUrl}
                          width="100%"
                        />
                        <button
                          className={"btn btn-color " + Styles.downloadButton}
                          onClick={saveCamera}
                        >
                          Salvar
                        </button>
                      </>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className={Styles.buttons}>
          {activeStep == 1 && (
            <>
              <button className={"btn  " + Styles.btn} onClick={previousStep}>
                {"<< VOLTAR"}
              </button>
              <button className={Styles.null}></button>
            </>
          )}
          {activeStep == 0 && (
            <>
              <button className={Styles.null}></button>
              <button className={"btn  " + Styles.btn} onClick={nextStep}>
                {"PRÓXIMO >>"}
              </button>
            </>
          )}
          {activeStep == 2 && (
            <>
              <button className={"btn  " + Styles.btn} onClick={previousStep}>
                {"<< VOLTAR"}
              </button>
              <button className={"btn  " + Styles.btn} onClick={handleEnd}>
                REINICIAR
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditComponent;
