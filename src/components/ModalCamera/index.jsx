import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import VideoStream from "../VideoComponent";
import "./styles.css";
import CameraService from "../../services/camera";
import { toast } from "react-toastify";

function ModalCamera(props) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [isPrivate, setIsPrivate] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [fpsLimiter, setFpsLimiter] = useState();
  const [showEmptyUrl, setshowEmptyUrl] = useState(true);
  const [showEmptyName, setshowEmptyName] = useState(true);
  const [showUrl, setshowUrl] = useState(true);
  const [showName, setshowName] = useState(true);

  useEffect(() => {
    setName(props.camera.name ?? "");
    setUrl(props.camera.url ?? "");
    setIsPrivate(props.camera.isPrivate ?? false);
    setFpsLimiter(props.camera.fpsLimiter ?? undefined);
    setLatitude(
      props.camera.coordinate ? props.camera.coordinate.latitude : undefined
    );
    setLongitude(
      props.camera.coordinate ? props.camera.coordinate.longitude : undefined
    );
  }, [props.camera]);

  const handleClose = () => props.onShowChange(false);

  const saveCamera = async (e) => {
    e.preventDefault();
    const cam = {
      id: props.camera.id,
      name: name,
      isPrivate: isPrivate,
      fpsLimiter: fpsLimiter,
      coordinate: {
        latitude: latitude,
        longitude: longitude,
      },
      url: url,
      isActive: props.camera.isActive,
    };
    try {
      if (cam.name == "") {
        throw "emptyname";
      } else if (cam.url == "") {
        throw "emptyurl";
      }
      if (cam.id) {
        await toast.promise(CameraService.update(cam), {
          pending: "Salvando",
          success: "Atualizado com sucesso! ",
          error: "Erro ao salvar, verifique se o nome já está sendo utilizados",
        });
      } else {
        // const verifyName = await CameraService.verifyName();
        // const verifyUrl = await CameraService.verifyUrl();
        // if (verifyName.content) {
        //   throw "nameExists";
        // }
        // if (verifyUrl) {
        //   throw "urlExists";
        // }
        await toast.promise(CameraService.register(cam), {
          pending: "Salvando",
          success: "Salvo com sucesso! ",
          error: "Erro ao salvar, verifique se o nome já está sendo utilizado",
        });
      }
      props.updateData();
      handleClose();
    } catch (error) {
      if (error == "emptyname") {
        setshowEmptyName(false);
      } else if (error == "emptyurl") {
        setshowEmptyUrl(false);
      } else if (error == "nameExists") {
        setshowName(false);
      } else if (error == "urlExists") {
        setshowUrl(false);
      }
    }
  };

  useEffect(() => {
    setshowEmptyName(true);
  }, [name]);
  useEffect(() => {
    setshowEmptyUrl(true);
  }, [url]);

  return (
    <Modal
      dialogClassName="modal-custom"
      show={props.show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <div className="modal-header-custom">
          <div>
            <Modal.Title>
              {props.type === TypeModal.Form ? (
                <>
                  <a className="navbar-brand camera-title">
                    {props.camera.id === undefined ? (
                      <>Cadastro de Câmera</>
                    ) : (
                      <>Edição de Câmera</>
                    )}
                  </a>
                </>
              ) : (
                <a className="navbar-brand camera-title">
                  Visualização de Câmera
                </a>
              )}
            </Modal.Title>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        {props.type === TypeModal.Form ? (
          <Form
            className="d-flex justify-content-center flex-column"
            onSubmit={saveCamera}
          >
            <Form.Group
              className="mb-2 d-flex flex-column"
              controlId="formBasicName"
            >
              <Form.Label className="mb-0">Nome</Form.Label>
              <Form.Control
                className="px-3 py-1"
                value={name}
                type="text"
                placeholder="Camera 01..."
                onChange={(e) => setName(e.target.value)}
              />
              {!showEmptyName && (
                <p className="camera-form-error">Nome é obrigatorio</p>
              )}
              {/* {!show && (
                <p className="camera-form-error">Nome já foi cadastrado</p>
              )} */}
            </Form.Group>
            <Form.Group
              className="mb-2 d-flex flex-column"
              controlId="formBasicUrl"
            >
              <Form.Label className="mb-0">URL</Form.Label>
              <Form.Control
                className="px-3 py-1"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="http:8080.com,,,"
              />
              {!showEmptyUrl && (
                <p className="camera-form-error">URL é obrigatorio</p>
              )}
              {/* {!show && (
                <p className="camera-form-error">URL já foi cadastrado</p>
              )} */}
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Form.Group
                className="mb-0 d-flex flex-column"
                controlId="formBasicPrivateOrNot"
              >
                <Form.Label className="mb-0">Privada</Form.Label>
                <div
                  key={"default-radio"}
                  className="d-flex justify-content-between"
                >
                  <Form.Check
                    className="me-3 mt-1"
                    inline
                    required
                    type={"radio"}
                    checked={isPrivate}
                    onClick={() => setIsPrivate(true)}
                    name="group1"
                    id={"inline-radio-1"}
                    label={"Sim"}
                  />

                  <Form.Check
                    className="me-3 mt-1"
                    inline
                    required
                    type={"radio"}
                    checked={!isPrivate}
                    onClick={() => setIsPrivate(false)}
                    name="group1"
                    label={"Não"}
                    id={"inline-radio-2"}
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="mb-2 d-flex flex-column"
                controlId="formBasicCoordinates"
              >
                <Form.Label className="mb-0">
                  Coordenadas Aproximadas
                </Form.Label>
                <div className="d-flex justify-content-around">
                  <Form.Control
                    className="px-3 py-1 me-3"
                    type="number"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                  <Form.Control
                    className="px-3 py-1"
                    type="number"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
              </Form.Group>
            </div>
            <Form.Group
              className="mb-5 d-flex flex-column"
              controlId="formBasicLimiterFPS"
            >
              <Form.Label className="mb-0">Limitador de FPS</Form.Label>
              <Form.Control
                className="px-3 py-1"
                type="number"
                value={fpsLimiter}
                onChange={(e) => setFpsLimiter(e.target.value)}
                placeholder="90"
              />
            </Form.Group>
            <div className="col text-center">
              <button
                className="btn btn-primary no-shadow"
                type="submit"
                id="button-addon2"
              >
                SALVAR
              </button>
            </div>
          </Form>
        ) : (
          <div className="container-video mb-2">
            <VideoStream url={url} />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export const TypeModal = {
  Video: "video",
  Form: "form",
};

export default ModalCamera;
