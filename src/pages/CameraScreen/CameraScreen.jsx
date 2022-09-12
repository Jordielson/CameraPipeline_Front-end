import React, { useEffect, useState } from "react";
import ModalCamera, {TypeModal} from "../../components/ModalCamera";
import SidebarMenu from "../../components/SideBarMenu";
import { Form } from "react-bootstrap";
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
    const [cameraList, setcameraList] = useState(listCamera);

    useEffect(() => {
        fetchCameraList();
    }, []);
    
    async function fetchCameraList() {
        try {
            const response = await CameraService.getAll();
            setcameraList(response);
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
                setcameraList(response);
            } catch (error) {
                console.log("Could not search cameras");
            }
        }
    }
    
    const activeCamera = async (camera, index) => {
        camera.isActive = !camera.isActive;
        try {
            const response = await CameraService.update(camera);
            const arr = [...cameraList];
            arr.splice(index, 1, response);
            setcameraList(arr);
        } catch (error) {
            console.log("Unable to activate camera");
        }
    }
    function showModal(cam, type) {
        setCamera(cam, () => {
            setTypeModal(type);
            handleShow();
        });
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="content">
                <div className="sidebar-component">
                <SidebarMenu page="camera" />
                </div>
                <div className="content-body justify-content-between">
                    <div className="sticky-top contentbar">
                        <nav className="navbar sticky-top navbar-light d-flex flex-row justify-content-between px-3 ">
                            <a className="navbar-brand camera-title">
                                Câmeras
                            </a>
                            <div className="d-flex flex-row justify-content-center">
                        
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
                                        className="btn btn-sm d-flex justify-content-between btn-add"
                                        onClick={() => showModal({}, TypeModal.Form)}
                                        >
                                        <span className="fab fa fa-plus me-1"></span>
                                        NOVO
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="container-fluid py-2">
                    <ul className="list-group list-group-flush">
                        <li className="nav-header disabled d-flex justify-content-between">
                            <div className="p-2">Nome</div>
                            <div className="p-2 align-self-start actions-camera"><span>Ações</span></div>
                        </li>
                        {cameraList.map((camera, index) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="p-2">{camera.name}</div>
                                <div className="p-2 d-flex justify-content-between align-self-center actions-camera">
                                    <span 
                                        className="fa fa-eye icon-actions"
                                        onClick={() => showModal(camera, TypeModal.Video)}
                                    />
                                    <span 
                                        className="fa fa-pencil-square icon-actions"
                                        onClick={() => showModal(camera, TypeModal.Form)}
                                    />
                                    <Form>
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                            label=""
                                            checked={camera.isActive}
                                            onClick={() => activeCamera(camera, index)}
                                        />
                                    </Form>
                                </div>
                            </li>
                        )
                        )}
                    </ul>
                    </div>
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