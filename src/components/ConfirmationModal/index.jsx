import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ConfirmationModal(props) {
  const handleShow = () => {
    props.onShowChange(false);
    props.info(false);
  };
  const handleInfo = () => {
    props.onShowChange(false);
    props.info(true);
  };

  return (
    <Modal show={props.show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir pipeline</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Tem certeza que deseja excluir o item selecionado?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShow}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleInfo}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
