import React, { useState, useEffect } from "react";
import SidebarMenu from "../../components/SideBarMenu";
import "./styles.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import FormPDI from "./../../components/FormPDI/index";
import { ListGroup, Pagination } from "react-bootstrap";
import PDIService from "./../../services/pdi";
import { toast } from "react-toastify";
import PaginationComponent from "../../components/PaginationComponent";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

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
  const [modelPDI, setPdiList] = useState([]);
  const [pdi, setPdi] = useState();
  const [showResults, setShowResults] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentListPage, setCurrentListPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log("salvo");
  // }, [modelPDI]);

  const handleClose = () => {
    setShow(false);
    getPDIs();
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
    getPDIs();
  };

  const handleShowEdit = (e) => {
    modelPDI.map((pdi) => {
      if (pdi.id == e) {
        setPdi(pdi);
      }
    });
    setShowEdit(true);
  };

  async function deleteConfirm(e) {
    await toast.promise(PDIService.delete(e), {
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
    getPDIs();
  }

  async function deleteHandler(e) {
    try {
      const response = await PDIService.verifyUsed({ id: e });

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
                      deleteConfirm(e);
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
        deleteConfirm(e);
      }
    } catch (error) {
      toast.error(<text id="toastMsg">Não foi remover o serviço</text>);
    }
  }

  // useEffect(() => {
  //   console.log("salvo");
  // }, [modelPDI]);

  useEffect(() => {
    if (showResults == true) {
      const params = {
        page: currentPage - 1,
        sort: "creationTime,DESC",
      };
      getPDIs(params);
    } else {
      const params = {
        name: query,
        page: currentPage - 1,
      };
      searchPdi(params);
    }
  }, [currentPage]);

  async function getPDIs(params) {
    if (!params) {
      params = {
        page: currentListPage - 1,
        sort: "creationTime,DESC",
      };
      setShowResults(true);
      setQuery("");
      setCurrentPage(currentListPage);
    }
    setLoading(true);
    const response = await PDIService.getAll(params);
    setTotalPages(response.totalPages);
    setPdiList(response.content);
    setCurrentListPage(response.number + 1);
    setLoading(false);
  }

  async function handleSearchPdi(e) {
    if (e.key === "Enter") {
      setShowResults(false);
      if (currentPage == 1) {
        const pdiName = {
          name: query,
        };
        searchPdi(pdiName);
      } else {
        setCurrentPage(1);
      }
    }
  }

  async function searchPdi(params) {
    try {
      const response = await PDIService.search(params);
      setTotalPages(response.totalPages);
      setPdiList(response.content);
    } catch (error) {
      toast.error(<span id="toastMsg">Não foi possível pesquisar</span>, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  useEffect(() => {
    getPDIs();
  }, []);

  return (
    <>
      <div className="content">
        <SidebarMenu page="servico" />

        <div className="content-body">
          <nav className="navbar navbar-dark navpdi">
            <div className="container-fluid">
              <a className="navbar-brand mx-3">Lista de serviços</a>

              <div className="width-full d-flex flex-row align-items-center justify-content-end action-buttons">
                <div className="d-flex align-items-center form-group px-3">
                  <span
                    className="fa fa-search fa-sm form-control-pdi 
                  "
                  ></span>
                  <input
                    type="text"
                    className="form-control form-input-pdi"
                    placeholder="Encontrar serviço"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearchPdi}
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
                    Adicionar novo serviço
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
          <ListGroup className="mx-4 mt-4 mb-1 listpdi">
            {modelPDI.map((pdi) => {
              return (
                <ListGroup.Item
                  key={pdi.id}
                  variant="light"
                  className="list-item"
                >
                  {pdi.name}
                  <div className="buttons">
                    <button
                      className="fa-solid fa-pen-to-square pdilist-pencil"
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
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            setPage={(e) => setCurrentPage(e)}
          />

          <div className="d-flex justify-content-center">
            {!showResults && (
              <span className="all-results" onClick={(e) => getPDIs()}>
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
