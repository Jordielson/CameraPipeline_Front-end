import React, { useState, useEffect } from "react";
import SidebarMenu from "../../components/SideBarMenu";
import "./styles.css";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import FormPDI from "./../../components/FormPDI/index";
import { ListGroup, Pagination } from "react-bootstrap";
import PDIService from "./../../services/pdi";
import { toast } from "react-toastify";

const modelPDIList = [
  {
    id: 1,
    name: "Redimensionar imagem",
    parameters: [
      {
        id: 1,
        name: "Tamanho da imagem",
        type: "STRING",
        required: true,
        index: 0,
      },
    ],
    category: "PROCESSAMENTO",
    url: "http://localhost:5000/api",
  },
  {
    id: 13,
    name: "CROP da imagem",
    parameters: [
      {
        id: 55,
        name: "Imagem",
        type: "STRING",
        required: true,
        index: 0,
      },
      {
        id: 56,
        name: "Dimensão da imagem",
        type: "STRING",
        required: true,
        index: 1,
      },
      {
        id: 57,
        name: "Xmin",
        type: "NUMBER",
        required: true,
        index: 2,
      },
      {
        id: 58,
        name: "Xmax",
        type: "NUMBER",
        required: true,
        index: 3,
      },
      {
        id: 59,
        name: "Ymin",
        type: "NUMBER",
        required: true,
        index: 4,
      },
      {
        id: 60,
        name: "Ymax",
        type: "NUMBER",
        required: true,
        index: 5,
      },
    ],
    category: "EDICAO",
    url: "http://localhost:5000/crop-image",
  },
  {
    id: 14,
    name: "Reduzir tamalho da imagem",
    parameters: [
      {
        id: 61,
        name: "Imagem",
        type: "STRING",
        required: true,
        index: 0,
      },
      {
        id: 62,
        name: "Tamanho da imagem",
        type: "STRING",
        required: true,
        index: 1,
      },
      {
        id: 63,
        name: "Novo tamanho da imagem",
        type: "STRING",
        required: true,
        index: 2,
      },
    ],
    category: "EDICAO",
    url: "http://localhost:5000/reduzir-image",
  },
];

function PDIScreen() {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const handleShow = () => setShow(true);
  const [showEdit, setShowEdit] = useState(false);
  const [modelPDI, setPdiList] = useState(modelPDIList);
  const [pdi, setPdi] = useState();
  const [showResults, setShowResults] = useState(true);

  const handleClose = () => {
    setShow(false);
    getPDIs();
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
    getPDIs();
  };

  function save() {
    // PDIService.saveAll(modelPDI);
  }
  const handleShowEdit = (e) => {
    modelPDI.map((pdi) => {
      if (pdi.id == e) {
        setPdi(pdi);
      }
    });
    setShowEdit(true);
  };

  async function deleteHandler(e) {
    // await PDIService.delete(e);
    await toast.promise(PDIService.delete(e), {
      pending: "Deletando",
      success: "Removido! ",
      error: "PDI não pode ser removido poque está em uso ",
    });
    getPDIs();
  }

  useEffect(() => {
    save();

    console.log("salvo");
  }, [modelPDI]);

  async function getPDIs() {
    const pdiList = await PDIService.getAll();
    setPdiList(pdiList.content);
    setShowResults(true);
  }

  async function searchPdi(e) {
    if (e.key === "Enter") {
      const pdiName = {
        name: query,
      };
      try {
        const response = await PDIService.search(pdiName);
        setQuery("");
        setPdiList(response.content);
        setShowResults(false);
      } catch (error) {
        console.log("Could not search cameras");
      }
    }
  }

  useEffect(() => {
    getPDIs();
  }, []);

  return (
    <>
      <div className="content">
        <SidebarMenu page="pdi" />

        <div className="content-body">
          <nav class="navbar navbar-dark navpdi">
            <div class="container-fluid">
              <a class="navbar-brand">Lista de PDIs</a>

              <div className="width-full d-flex flex-row align-items-center justify-content-end">
                <div className="d-flex align-items-center form-group px-3">
                  <span
                    className="fa fa-search fa-sm form-control-pdi 
                  "
                  ></span>
                  <input
                    type="text"
                    className="form-control form-input-pdi"
                    placeholder="Encontrar PDI"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={searchPdi}
                  />
                </div>

                <div className="d-flex justify-content-end">
                  {/* <button
                    id="button-add-camera"
                    type="button"
                    className="btn btn-outline-secondary d-flex justify-content-between btn-add-camera"
                    onClick={() => showModal({}, TypeModal.Form)}
                  >
                    <span className="fab fa fa-plus me-1"></span>
                    NOVO
                  </button> */}
                  <button
                    className="btn btn-outline-secondary addpdi no-shadow"
                    type="button"
                    id="button-addon2"
                    onClick={handleShow}
                  >
                    Adicionar novo PDI
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <ListGroup className="mx-4 mt-4 mb-1 listpdi">
            {modelPDI.map((pdi) => {
              return (
                <ListGroup.Item key={pdi.id} variant="light">
                  {pdi.name}
                  <div className="buttons">
                    <button
                      class="fa-solid fa-pen-to-square pdilist-pencil"
                      title="EDITAR"
                      id={pdi.id}
                      onClick={(e) => handleShowEdit(pdi.id)}
                    ></button>
                    <button
                      className={"pdilist-trash fa-solid fa-trash "}
                      title="EXCLUIR"
                      id={pdi.id}
                      onClick={(e) => {
                        deleteHandler(pdi.id);
                      }}
                    ></button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          {/* <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination> */}
          <div className="d-flex justify-content-center">
            {!showResults && (
              <span className="all-results" onClick={getPDIs}>
                voltar para todos os resultados
              </span>
            )}
          </div>
          <FormPDI show={show} hide={handleClose} obj={false} />
          <FormPDI
            key={pdi ? pdi.id : 1}
            show={showEdit}
            hide={handleCloseEdit}
            obj={pdi}
          />
        </div>
      </div>
    </>
  );
}

export default PDIScreen;
