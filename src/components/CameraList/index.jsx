import React, { useEffect, useState } from "react";
import ModalCamera, { TypeModal } from "../../components/ModalCamera";
import { ListGroup } from "react-bootstrap";
import { useStateCallback } from "../../shared/Utils";
import "./styles.css";
import CameraService from "../../services/camera";
import "react-confirm-alert/src/react-confirm-alert.css";

function CameraList(props) {
  const [show, setShow] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const [camera, setCamera] = useStateCallback({});
  const [cameraList, setCameraList] = useState([{}]);
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
      setShowResults(false);
      console.log("Could not get the cameras");
    }
  }

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

  const handleShow = () => setShow(true);

  const cameraSelected = (camera) => {
    props.sendCamera(camera);
  };

  return (
    <>
      <ListGroup className="mx-4 mt-4 mb-1 listCamera">
        {cameraList.map((obj) => {
          return (
            <>
              {showResults ? (
                <ListGroup.Item
                  key={obj.id}
                  variant="light"
                  className="item"
                >
                  {obj.name}
                  <div className="buttons list-group-item-camera">
                    <button
                      className="fa-solid fa-eye icon-actions camera-list-view"
                      title="visualizar"
                      id={obj.id}
                      onClick={() => showModal(obj, TypeModal.Video)}
                    />
                    <input
                      title="selecione"
                      className="form-check-input mx-2"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onClick={() => cameraSelected(obj)}
                    />
                  </div>
                  <ModalCamera
                    show={show}
                    onShowChange={setShow}
                    camera={camera}
                    updateData={fetchCameraList}
                    type={typeModal}
                  />
                </ListGroup.Item>
              ) : (
                <span>Nenhuma câmera foi encontrada</span>
              )}
            </>
          );
        })}
      </ListGroup>
    </>
  );
}

export default CameraList;
