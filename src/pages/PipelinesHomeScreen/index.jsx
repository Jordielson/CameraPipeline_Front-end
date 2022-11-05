import SidebarMenu from "../../components/SideBarMenu";
import { Form, ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PipelineService from "../../services/pipeline";
import PaginationComponent from "../../components/PaginationComponent";
import NewPipelineModal from "../../components/NewPipelineModal";

import Styles from "./styles.module.css";

export default function PipelinesHomeScreen() {
  const [pipelineList, setPipelineList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [showNewPipelineModal, setShowNewPipelineModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPipelineList();
  }, []);

  useEffect(() => {
    const params = {
      page: currentPage - 1,
    };
    fetchPipelineList(params);
  }, [currentPage]);

  async function fetchPipelineList(params) {
    try {
      const response = await PipelineService.getAll(params);
      setTotalPages(response.totalPages);
      setPipelineList(response.content);
      setShowResults(true);
    } catch (error) {
      console.log("Could not get the pipelines");
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

  const deletePipeline = async (pipeline) => {
    try {
      await toast.promise(PipelineService.deletePipeline(pipeline.id), {
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

  const enterPipeline = (pipeline) => {
    navigate("../pipeline", { replace: true, state: { pipeline } });
  };

  return (
    <>
      <div className="content">
        <SidebarMenu page="pipelines" />
        <div className="content-body">
          <nav className="navbar">
            <div className="container-fluid">
              <a className="navbar-brand navbar-dark">Pipelines</a>
              <div className="d-flex flex-row align-items-center justify-content-end">
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
          <ListGroup className={"mx-4 mt-4 mb-1 " + Styles.listPipeline}>
            {pipelineList.map((pipeline) => {
              return (
                <ListGroup.Item
                  className={Styles.list}
                  key={pipeline.id}
                  onClick={(e) => enterPipeline(pipeline)}
                  variant="light"
                >
                  <div>{pipeline.name}</div>
                  <div className={Styles.edit}>
                    <Form>
                      <Form.Check
                        reverse
                        role="button"
                        label="Ativar/Desativar"
                        type="switch"
                        className="switch-actions mx-2"
                        id="custom-switch"
                        checked={pipeline.active}
                        onChange={() => activePipeline(pipeline)}
                      />
                    </Form>
                    <button
                      title="EDITAR"
                      className={
                        Styles.editText +
                        " fa-solid fa-pen-to-square pdilist-pencil"
                      }
                      onClick={() => enterPipeline(pipeline)}
                    ></button>
                    <button
                      title="EXCLUIR"
                      className={
                        Styles.excludeButton +
                        " pdilist-trash fa-solid fa-trash"
                      }
                      onClick={(e) => deletePipeline(pipeline)}
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
              <span className="all-results" onClick={fetchPipelineList}>
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
    </>
  );
}
