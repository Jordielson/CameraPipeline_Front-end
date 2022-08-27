import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SidebarMenu from "../../components/SideBarMenu";
import "./styles.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function PDIScreen() {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState("top-start");

  const [PDIName, setPDIName] = useState("Nome do PDI");
  const [url, setUrl] = useState("https://");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="content">
        <SidebarMenu page="pdi" />

        <div>
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleShow}
          >
            Adicionar novo PDI
          </button>
          <Modal
            dialogClassName="modal-custom"
            show={show}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <div className="modal-header-custom">
                <div>
                  <Modal.Title>
                    <input
                      className="input-custom"
                      value={PDIName}
                      onChange={(value) => setPDIName(value.target.value)}
                    ></input>
                  </Modal.Title>
                </div>
                <div>
                  URL:
                  <input
                    className="form-control"
                    value={url}
                    onChange={(value) => setUrl(value.target.value)}
                  ></input>
                </div>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div class="col text-end ">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  NOVO
                </button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div class="col text-center">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  SALVAR
                </button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default PDIScreen;
