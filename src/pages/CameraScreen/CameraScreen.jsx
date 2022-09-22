import React, { useEffect, useState } from "react";
import ModalCamera, { TypeModal } from "../../components/ModalCamera";
import SidebarMenu from "../../components/SideBarMenu";
import { Form, ListGroup } from "react-bootstrap";
import { useStateCallback } from "../../shared/Utils";
import "./styles.css";
import CameraService from "../../services/camera";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

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
  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    fetchCameraList();
  }, []);

  async function fetchCameraList() {
    try {
      const response = await CameraService.getAll();
      setCameraList(response.content);
      setShowResults(true);
    } catch (error) {
      console.log("Could not get the cameras");
    }
  }
  async function searchCamera(e) {
    if (e.key === "Enter") {
      const cam = {
        name: query,
      };
      try {
        const response = await CameraService.search(cam);
        setQuery("");
        setCameraList(response.content);
        setShowResults(false);
      } catch (error) {
        console.log("Could not search cameras");
      }
    }
  }

  const activeCamera = async (camera) => {
    camera.isActive = !camera.isActive;
    try {
      await CameraService.active(camera);
      fetchCameraList();
    } catch (error) {
      camera.isActive = !camera.isActive;
      toast.error("Não foi possível ativar/desativar a camera");
    }
  };
  function showModal(cam, type) {
    if (cam !== camera) {
      setCamera(cam, () => {
        setTypeModal(type);
        handleShow();
      });
    } else {
      setTypeModal(type);
      handleShow();
    }
  }

  const deleteCameraConfirm = async (cam) => {
    await toast.promise(CameraService.delete(cam), {
      pending: "Deletando",
      success: "Removido! ",
      error: "Erro interno",
    });

    fetchCameraList();
  };

  const deleteCamera = async (cam) => {
    const response = await CameraService.verifyUsed({ id: cam.id});

    if (response.valid) {
      await confirmAlert({
        title: "Deseja remover o Item?",
        message:
          "O Item solicitado está sendo utilizado no momento, deseja remover mesmo assim?",
        buttons: [
          {
            label: "sim",
            onClick: () => {
              deleteCameraConfirm(cam);
            },
          },
          {
            label: "cancelar",
            onClick: () => {},
          },
        ],
      });
    } else {
      deleteCameraConfirm(cam)
    }
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <div className="content">
        <SidebarMenu page="camera" />
        <div className="content-body">
          <nav className="navbar nav-camera">
            <div className="container-fluid">
              <a className="navbar-brand navbar-dark camera-title">Câmeras</a>
              <div className="d-flex flex-row align-items-center justify-content-end">
                <div className=" form-group has-search form-search-camera justify-content-between px-3">
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
                    Adicionar câmera
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <ListGroup className="mx-4 mt-4 mb-1 listCamera">
            {cameraList.map((camera) => {
              return (
                <ListGroup.Item key={camera.id} variant="light">
                  {camera.name}
                  <div className="buttons list-group-item-camera">
                    <button
                      className="fa-solid fa-eye icon-actions camera-list-view"
                      title="visualizar"
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
          <div className="d-flex justify-content-center">
            {!showResults && (
              <span className="all-results" onClick={fetchCameraList}>
                voltar para todos os resultados
              </span>
            )}
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
