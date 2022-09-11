import React, { useState } from "react";
import ModalCamera, {TypeModal} from "../../components/ModalCamera";
import SidebarMenu from "../../components/SideBarMenu";
import { Form } from "react-bootstrap";
import "./styles.css";

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
    },
];

function CameraScreen() {
    const [show, setShow] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [camera, setCamera] = useState(listCamera[0]);
    const [cameraList, setcameraList] = useState(listCamera);


    const showFormCamera = (camera) => {
        setCamera(camera);
        setTypeModal(TypeModal.Form);
        handleShow();
    }
    const showVideoCamera = (camera) => {
        setCamera(camera);
        setTypeModal(TypeModal.Video);
        handleShow();
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
                                    <input type="text" className="form-control form-input-camera" placeholder="Encontrar câmera"/>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button
                                        id="button-add-camera"
                                        type="button"
                                        className="btn btn-sm d-flex justify-content-between btn-add"
                                        onClick={() => showFormCamera({})}
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
                        {cameraList.map((camera) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="p-2">{camera.name}</div>
                                <div className="p-2 d-flex justify-content-between align-self-center actions-camera">
                                    <span 
                                        className="fa fa-eye icon-actions"
                                        onClick={() => showVideoCamera({})}
                                    />
                                    <span 
                                        className="fa fa-pencil-square icon-actions"
                                        onClick={() => showFormCamera(camera)}
                                    />
                                    <Form>
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                            label=""
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
                    onCameraChange={setCamera}
                    type={typeModal}
                />
            </div>
        </>
    );
}

export default CameraScreen;