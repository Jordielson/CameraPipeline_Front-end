import { Step, StepLabel } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import Styles from "./image.module.css";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import axios from "axios";
import ImageService from "../../services/image";
import VideoService from "../../services/video";

const pipelineJson = [
  {
    id: 1,
    name: "Aumentar imagem",
    description:
      "Servico que aumentar o tamanho da imagem para um tamanho especifico determinado pelo usuario",
    creationDate: "2022-06-26T14:30:30",
    modificationTime: "2022-06-26T14:30:30",
    isActive: false,
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
  },
  {
    id: 3,
    name: "Redimencionar imagem",
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
  },
];

function EditComponent(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [pipelineList, setPipelineList] = useState(pipelineJson);
  const [pipeline, setPipeline] = useState();
  const [returnedImage, setReturnedImage] = useState();
  const [video, setVideo] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [generatedImageUrl, setgeneratedImageUrl] = useState();
  const [generatedVideoUrl, setgeneratedVideoUrl] = useState();

  function nextStep() {
    if (imageUrl != null || image != null || videoUrl != null || video) {
      if (activeStep < 2) {
        setActiveStep((currentStep) => currentStep + 1);
      }
    } else {
      toast.error(`Selecione um(a) ${props.type} antes de prosseguir`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
  function previousStep() {
    if (activeStep > 0) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  }

  const downloadImage = () => {
    if (props.type == "imagem") {
      saveAs(generatedImageUrl, "image.jpg");
    } else {
    }
  };

  async function generateImage() {
    if (props.type == "imagem") {
      console.log(image);
      const data = new FormData();
      data.append("image", image);
      data.append("pipeline", pipeline.id);
      const returnedImage = await ImageService.upload(data);
      // const resultImage = await ImageService.generateImage(data);
      setgeneratedImageUrl(returnedImage.url);
    } else {
      const data = new FormData();
      data.append("video", video);
      data.append("pipeline", pipeline.id);
      const response = await VideoService.upload(data);
      // const response = await VideoService.generateVideo(data);
      setgeneratedVideoUrl(response.url);
    }
  }

  function handlePipeline(e) {
    pipelineList.map((item) => {
      if (item.id == e.target.id) {
        setPipeline(item);
      }
    });

    generateImage();

    setActiveStep((currentStep) => currentStep + 1);
  }

  function handleEnd() {
    setImage(null);
    setImageUrl(null);
    setVideo(null);
    setVideoUrl(null);
    setActiveStep((currentStep) => 0);
  }

  function handleImage(e) {
    if (props.type == "imagem") {
      setImage(e.target.files[0]);
    } else {
      setVideo(e.target.files[0]);
    }
  }
  function handleUrl(e) {
    if (props.type == "imagem") {
      setImageUrl(e.target.value);
    } else {
      setVideoUrl(e.target.value);
    }
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
      <div className={Styles.content}>
        <Stepper alternativeLabel activeStep={activeStep}>
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
        <div className={Styles.stepContent}>
          {(activeStep == 0 && (
            <Form.Group
              controlId="formFile"
              className="d-flex flex-column align-items-center "
            >
              <h2 className={Styles.stepTitle}>Selecione o arquivo</h2>
              <Form.Control
                type="file"
                size="sm"
                accept={props.format}
                className={Styles.input}
                onChange={(e) => handleImage(e)}
              />
              <text>ou insira o URL do conteúdo</text>
              <Form.Control
                className={Styles.input}
                size="sm"
                type="text"
                placeholder="URL"
                onChange={(e) => handleUrl(e)}
              />
            </Form.Group>
          )) ||
            (activeStep == 1 && (
              <div className={"d-flex flex-column  "}>
                <h2 className={(Styles.stepTitle = "d-flex align-self-center")}>
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
              </div>
            )) ||
            (activeStep == 2 && (
              <div className={Styles.stepdownload}>
                <h3>Resultado:</h3>
                <div>
                  {props.type == "imagem" && (
                    <img
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
