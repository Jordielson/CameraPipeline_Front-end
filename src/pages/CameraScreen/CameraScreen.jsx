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
import PaginationComponent from "../../components/PaginationComponent";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function CameraScreen() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const [camera, setCamera] = useStateCallback({});
  const [cameraList, setCameraList] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentListPage, setCurrentListPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCameraList();
  }, []);

  useEffect(() => {
    if (showResults == true) {
      const params = {
        page: currentPage - 1,
        sort: "creationTime,DESC",
      };
      fetchCameraList(params);
    } else {
      const params = {
        name: query,
        page: currentPage - 1,
      };
      searchCamera(params);
    }
  }, [currentPage]);

  async function fetchCameraList(params) {
    if (!params) {
      params = {
        page: currentListPage - 1,
        sort: "creationTime,DESC",
      };
      setShowResults(true);
      setQuery("");
      setCurrentPage(currentListPage);
    }
    try {
      setLoading(true);
      const response = await CameraService.getAll(params);
      setTotalPages(response.totalPages);
      setCameraList(response.content);
      setCurrentListPage(response.number + 1);
      setLoading(false);
    } catch (error) {
      toast.error(<span id="toastMsg">Não foi possível pesquisar</span>);
      setLoading(false);
    }
  }

  async function handleSearchCamera(e) {
    if (e.key === "Enter") {
      setShowResults(false);
      if (currentPage == 1) {
        const cam = {
          name: query,
        };
        searchCamera(cam);
      } else {
        setCurrentPage(1);
      }
    }
  }

  async function searchCamera(params) {
    try {
      const response = await CameraService.search(params);
      setTotalPages(response.totalPages);
      setCameraList(response.content);
    } catch (error) {
      toast.error(<span id="toastMsg">Não foi possível pesquisar</span>);
    }
  }

  const activeCamera = async (camera) => {
    camera.isActive = !camera.isActive;
    try {
      await CameraService.active(camera);
      fetchCameraList();
    } catch (error) {
      camera.isActive = !camera.isActive;
      toast.error(
        <text id="toastMsg">Não foi possível ativar/desativar a camera</text>
      );
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
      pending: {
        render({ data }) {
          return <text id="toastMsg">Deletando</text>;
        },
      },
      success: {
        render({ data }) {
          return <text id="toastMsg">Removido!</text>;
        },
      },
      error: {
        render({ data }) {
          return <text id="toastMsg">Erro interno</text>;
        },
      },
    });

    fetchCameraList();
  };

  const deleteCamera = async (cam) => {
    try {
      const response = await CameraService.verifyUsed({ id: cam.id });
      if (response.valid) {
        await confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="custom-ui">
                <h1>Item em uso!</h1>
                <p>
                  O Item solicitado está alocado em uma ou mais Pipelines,
                  deseja remover mesmo assim?
                </p>
                <div className="confirm-btn">
                  <button className="btn btn-secondary" onClick={onClose}>
                    Cancelar
                  </button>
                  <button
                    className="btn btn-danger m-2"
                    onClick={() => {
                      deleteCameraConfirm(cam);
                      onClose();
                    }}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            );
          },
          overlayClassName: "overlay",
        });
      } else {
        deleteCameraConfirm(cam);
      }
    } catch (error) {
      toast.error(<text id="toastMsg">Não foi remover possível a camera</text>);
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
              <a className="navbar-brand navbar-dark camera-title mx-3">
                Câmeras
              </a>
              <div className="d-flex flex-row align-items-center justify-content-end action-buttons">
                <div className=" form-group has-search form-search-camera justify-content-between px-3">
                  <span className="fa fa-search fa-sm form-control-camera"></span>
                  <input
                    type="text"
                    className="form-control form-input-camera"
                    placeholder="Encontrar câmera"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearchCamera}
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
          {loading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
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
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            setPage={(e) => setCurrentPage(e)}
          />
          <div className="d-flex justify-content-center">
            {!showResults && (
              <span className="all-results" onClick={(e) => fetchCameraList()}>
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
