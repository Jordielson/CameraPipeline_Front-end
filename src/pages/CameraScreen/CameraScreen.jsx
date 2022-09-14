import React, { useEffect, useState } from "react";
import ModalCamera, {TypeModal} from "../../components/ModalCamera";
import SidebarMenu from "../../components/SideBarMenu";
import { Form, ListGroup } from "react-bootstrap";
import { useStateCallback } from "../../shared/Utils";
import "./styles.css";
import CameraService from "../../services/camera";

const listCamera = [
    {
      id: 1,
      name: "Camera 01",
      isPrivate: true,
      fpsLimiter: 120,
      coordinate: {
        latitude: 60.5621,
        longitude: 125.4561,
      },
      url: "rtsp://rtsp.stream/pattern",
      isActive: false,
    },
    {
      id: 2,
      name: "Camera 02",
      isPrivate: false,
      fpsLimiter: 90,
      coordinate: {
        latitude: 60.5621,
        longitude: 125.4561,
      },
      url: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
      isActive: false,
    },
    {
      id: 3,
      name: "Camera 03",
      isPrivate: false,
      fpsLimiter: 90,
      coordinate: {
        latitude: 60.5621,
        longitude: 125.4561,
      },
      url: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
      isActive: false,
    },
    {
      id: 4,
      name: "Camera 04",
      isPrivate: false,
      fpsLimiter: 90,
      coordinate: {
        latitude: 60.5621,
        longitude: 125.4561,
      },
      url: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
      isActive: false,
    },
    {
      id: 5,
      name: "Camera 05",
      isPrivate: false,
      fpsLimiter: 90,
      coordinate: {
        latitude: 60.5621,
        longitude: 125.4561,
      },
      url: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
      isActive: false,
    },
];

function CameraScreen() {
    const [query, setQuery] = useState("");
    const [show, setShow] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [camera, setCamera] = useStateCallback({});
    const [cameraList, setCameraList] = useState(listCamera);

    useEffect(() => {
        fetchCameraList();
    }, []);
    
    async function fetchCameraList() {
        try {
            const response = await CameraService.getAll();
            setCameraList(response);
        } catch (error) {
            console.log("Could not get the cameras");
        }
    }
    async function searchCamera(e) {
        if (e.key === 'Enter') {
            const cam = {
                name: query
            }
            try {
                const response = await CameraService.search(cam);
                setQuery("");
                setCameraList(response);
            } catch (error) {
                console.log("Could not search cameras");
            }
        }
    }
    
    const activeCamera = async (camera) => {
        camera.isActive = !camera.isActive;
        try {
            const response = await CameraService.update(camera);
            fetchCameraList();
        } catch (error) {
            console.log("Unable to activate camera");
        }
    }
    function showModal(cam, type) {
        if(cam !== camera) {
            setCamera(cam, () => {
                setTypeModal(type);
                handleShow();
            });
        } else {
            setTypeModal(type);
            handleShow();
        }
    }

    const deleteCamera = async (cam) => {
        try {
            await CameraService.delete(cam);
            fetchCameraList();
        } catch (error) {
            alert("Error")
        }
    }

    const handleShow = () => setShow(true);

    return (
        <>
            <div className="content">
                <SidebarMenu page="camera" />
                <div className="content-body">
                    <nav className="navbar nav-camera">
                        <div className="container-fluid">
                            <a className="navbar-brand camera-title">
                                Câmeras
                            </a>
                            <div className="d-flex flex-row justify-content-end">
                        
                                <div className="col-md-10 form-group has-search form-search-camera justify-content-between px-3">
                                    <span className="fa fa-search fa-sm form-control-camera"></span>
                                    <input 
                                        type="text" 
                                        className="form-control form-input-camera" 
                                        placeholder="Encontrar câmera"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={searchCamera}
                                    />
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button
                                        id="button-add-camera"
                                        type="button"
                                        className="btn btn-outline-secondary d-flex justify-content-between btn-add-camera"
                                        onClick={() => showModal({}, TypeModal.Form)}
                                        >
                                        <span className="fab fa fa-plus me-1"></span>
                                        NOVO
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <ListGroup className="m-4 listCamera">
                        {cameraList.map((camera) => {
                        return (
                            <ListGroup.Item key={camera.id} variant="light">
                            {camera.name}
                            <div className="buttons list-group-item-camera">
                                <button
                                className="fa-solid fa-eye icon-actions camera-list-view"
                                title="EDITAR"
                                id={camera.id}
                                onClick={() => showModal(camera, TypeModal.Video)}
                                ></button>
                                <button
                                className="fa-solid fa-pen-to-square camera-list-pencil"
                                title="EDITAR"
                                id={camera.id}
                                onClick={() => showModal(camera, TypeModal.Form)}
                                ></button>
                                <Form>
                                    <Form.Check 
                                        type="switch"
                                        className="switch-actions"
                                        id="custom-switch"
                                        label=""
                                        checked={camera.isActive}
                                        onClick={() => activeCamera(camera)}
                                    />
                                </Form>
                                <button
                                className={"camera-list-trash fa-solid fa-trash "}
                                title="EXCLUIR"
                                id={camera.id}
                                onClick={() => deleteCamera(camera)}
                                ></button>
                            </div>
                            </ListGroup.Item>
                        );
                        })}
                    </ListGroup>
                </div>
                <ModalCamera 
                    show={show} 
                    onShowChange={setShow} 
                    camera={camera} 
                    updateData={fetchCameraList}
                    type={typeModal}
                />
            </div>
        </>
    );
}

export default CameraScreen;