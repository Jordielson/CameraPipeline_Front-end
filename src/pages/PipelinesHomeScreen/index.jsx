import SidebarMenu from "../../components/SideBarMenu";
import { Form, ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PipelineService from "../../services/pipeline";
import PaginationComponent from "../../components/PaginationComponent";
import NewPipelineModal from "../../components/NewPipelineModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import Styles from "./styles.module.css";

export default function PipelinesHomeScreen() {
  const [pipelineList, setPipelineList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentListPage, setCurrentListPage] = useState(1);
  const [showResults, setShowResults] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [showNewPipelineModal, setShowNewPipelineModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [info, setInfo] = useState(false);
  const [pipelineDelete, setPipelineDelete] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchPipelineList();
  }, []);

  useEffect(() => {
    if (showResults == true) {
      const params = {
        page: currentPage - 1,
        sort: "creationTime,DESC",
      };
      fetchPipelineList(params);
    } else {
      const params = {
        name: query,
        page: currentPage - 1,
      };
      searchPipeline(params);
    }
  }, [currentPage]);

  async function fetchPipelineList(params) {
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
      const response = await PipelineService.getAll(params);
      setTotalPages(response.totalPages);
      setPipelineList(response.content);
      setCurrentListPage(response.number + 1);
      setLoading(false);
    } catch (error) {
      toast.error(
        <span id="toastMsg">Não foi possível carregar os pipeline</span>
      );
    }
  }

  const activePipeline = async (pipeline) => {
    try {
      await PipelineService.switchActive({
        id: pipeline.id,
        active: !pipeline.active,
      });
      fetchPipelineList();
    } catch (error) {
      toast.error(
        <text id="toastMsg">Não foi possível ativar/desativar a pipeline</text>
      );
    }
  };

  useEffect(() => {
    info ? deletePipeline() : setInfo(false);
  }, [info]);

  const deletePipeline = async () => {
    try {
      await toast.promise(PipelineService.deletePipeline(pipelineDelete.id), {
        pending: {
          render({ data }) {
            return <text id="toastMsg">Deletando</text>;
          },
        },
        success: {
          render({ data }) {
            return <text id="toastMsg">Deletado com sucesso! 👌</text>;
          },
        },
      });
      fetchPipelineList();
    } catch (error) {
      let errorMessage = "";
      switch (error.response.data.code) {
        case "PIPELINE_USED":
          errorMessage = "Pipeline está sendo utilizada";
          break;
        default:
          errorMessage = "Erro ao tentar deletar o pipeline";
          break;
      }
      toast.error(<text id="toastMsg">{errorMessage}</text>);
    }
  };

  async function handleSearchPipeline(e) {
    if (e.key === "Enter") {
      setShowResults(false);
      if (currentPage == 1) {
        const pipelienName = {
          name: query,
        };
        searchPipeline(pipelienName);
      } else {
        setCurrentPage(1);
      }
    }
  }

  async function searchPipeline(pipelienName) {
    try {
      const response = await PipelineService.search(pipelienName);
      setTotalPages(response.totalPages);
      setPipelineList(response.content);
    } catch (error) {
      toast.error(<span id="toastMsg">Não foi possível pesquisar</span>);
    }
  }

  const enterPipeline = (pipeline) => {
    navigate("../pipeline", { state: { pipeline } });
  };

  return (
    <>
      <div className="content">
        <SidebarMenu page="pipelines" />
        <div className="content-body">
          <nav className="navbar">
            <div className="container-fluid">
              <a className="navbar-brand navbar-dark mx-3">Pipelines</a>
              <div className="d-flex flex-row align-items-center justify-content-end">
                <div className="d-flex align-items-center form-group px-3">
                  <span className="fa fa-search fa-sm form-control-pdi" />
                  <input
                    type="text"
                    className="form-control form-input-camera"
                    placeholder="Encontrar Pipeline"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearchPipeline}
                  />
                </div>
                <div className=" form-group has-search justify-content-between px-3">
                  <span
                    onClick={() => {
                      setShowNewPipelineModal(true);
                    }}
                    role="button"
                    className="btn btn-color"
                  >
                    Criar nova
                  </span>
                </div>
              </div>
            </div>
          </nav>
          {loading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
          <div className={Styles.labelMain}>
            <label>Selecione uma pipeline</label>
          </div>
          <ListGroup className={"mx-4 mt-4 mb-1 " + Styles.listPipeline}>
            {pipelineList.map((pipeline) => {
              return (
                <ListGroup.Item
                  className={Styles.list}
                  key={pipeline.id}
                  // onClick={(e) => enterPipeline(pipeline)}
                  variant="light"
                >
                  <div
                    className={Styles.range + " px-2"}
                    onClick={() => enterPipeline(pipeline)}
                  >
                    {pipeline.name}
                  </div>
                  <div className={Styles.edit + " m-2"}>
                    <Form>
                      <Form.Check
                        reverse
                        role="button"
                        // label="Ativar/Desativar"
                        type="switch"
                        className="switch-actions mx-2"
                        id="custom-switch"
                        checked={pipeline.active}
                        onChange={() => activePipeline(pipeline)}
                      />
                    </Form>
                    <button
                      title="EDITAR"
                      className={" fa-solid fa-pen-to-square pdilist-pencil"}
                      onClick={() => enterPipeline(pipeline)}
                    ></button>
                    <button
                      title="EXCLUIR"
                      className={
                        Styles.excludeButton +
                        " pdilist-trash fa-solid fa-trash"
                      }
                      onClick={() => {
                        setPipelineDelete(pipeline);
                        setShowConfirmation(true);
                      }}
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
              <span
                className="all-results"
                onClick={(e) => fetchPipelineList()}
              >
                voltar para todos os resultados
              </span>
            )}
          </div>
        </div>
      </div>
      <NewPipelineModal
        show={showNewPipelineModal}
        onShowChange={setShowNewPipelineModal}
        updateData={fetchPipelineList}
      />
      <ConfirmationModal
        show={showConfirmation}
        onShowChange={setShowConfirmation}
        info={setInfo}
      />
    </>
  );
}
