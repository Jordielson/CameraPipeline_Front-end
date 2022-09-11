import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import VideoStream from "../VideoComponent";
import "./styles.css";

function ModalCamera(props) {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [fpsLimiter, setFpsLimiter] = useState("");

    useEffect(() => {
        setName(props.camera.name ?? "");
        setUrl(props.camera.url ?? "");
        setIsPrivate(props.camera.isPrivate ?? "");
        setFpsLimiter(props.camera.fpsLimiter ?? false);
        setLatitude(props.camera.coordinate ? 
            props.camera.coordinate.latitude : "");
        setLongitude(props.camera.coordinate ? 
            props.camera.coordinate.longitude : "");
    }, [props.camera]);

    const handleClose = () => props.onShowChange(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        handleClose();
    }

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
                                <a className="navbar-brand props.camera-title">
                                    Cadastro de Câmera
                                </a>

                            ) : (
                                <a className="navbar-brand props.camera-title">
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
                            required
                            placeholder="Camera 01..."
                            onChange={(e) => setName(e.target.value)}
                            />
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
                            required
                            placeholder="http:8080.com,,,"
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-around">
                            <Form.Group
                                className="mb-0 d-flex flex-column"
                                controlId="formBasicPrivateOrNot"
                            >
                                <Form.Label className="mb-0">Privada</Form.Label>
                                <div key={"default-radio"} className="d-flex justify-content-between">
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
                                <Form.Label className="mb-0">Coordenadas Aproximadas</Form.Label>
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
                            required
                            placeholder="90"
                            />
                        </Form.Group>
                        <div className="col text-center">
                            <button
                            className="btn btn-outline-secondary"
                            type="submit"
                            id="button-addon2"
                            onClick={handleSignUp}
                            >
                            SALVAR
                            </button>
                        </div>
                    </Form>
                ) : (
                    <div className="container-video mb-2">
                        <VideoStream url={""} />
                    </div>
                )}
                
            </Modal.Body>
        </Modal>
    );
}

export const TypeModal = {
	Video: "video",
	Form: "form"
}

export default ModalCamera;