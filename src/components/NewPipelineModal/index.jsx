import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import PipelineService from "../../services/pipeline";

export default function NewPipeline(props) {
  const [name, setName] = useState("");

  const savePipeline = async (e) => {
    e.preventDefault();

    const request = {
      name: name,
      description: "Descrição genérica",
      category: "PIPELINE",
      active: true,
      pdilist: [],
    };
    await toast.promise(PipelineService.register(request), {
      pending: {
        render({ data }) {
          return <text id="toastMsg">Salvando</text>;
        },
      },
      success: {
        render({ data }) {
          exit();
          props.updateData();
          return <text id="toastMsg">Salvo com sucesso!</text>;
        },
      },
      error: {
        render({ data }) {
          return <text id="toastMsg">Erro ao tentar criar a pipeline</text>;
        },
      },
    });
  };

  const exit = () => {
    props.onShowChange()
    setName("");
  }

  return (
    <Modal
      dialogClassName="modal-custom"
      show={props.show}
      onHide={exit}
    >
      <Modal.Header closeButton>
        <div className="modal-header-custom">
          <div>
            <Modal.Title>Criar pipeline</Modal.Title>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form
          className="d-flex justify-content-center flex-column"
          onSubmit={savePipeline}
        >
          <Form.Group
            className="mb-2 d-flex flex-column"
            controlId="formBasicName"
          />
          <Form.Label className="mb-0">Nome</Form.Label>
          <Form.Control
            className="px-3 py-1"
            value={name}
            type="text"
            placeholder="Digite o nome da pipeline"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="col text-center mt-3">
            <button
              className="btn btn-color no-shadow"
              type="submit"
              id="button-addon2"
            >
              SALVAR
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
