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

  const enterPipeline = (pipeline) => {
    navigate("../pipeline", { replace: true, state: { pipeline } });
  };

  return (
    <>
      <div className="content">
        <SidebarMenu page="pipeline-home" />
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
                  >
                    Criar nova
                  </span>
                </div>
              </div>
            </div>
          </nav>
          <ListGroup className="mx-4 mt-4 mb-1 listPipeline">
            {pipelineList.map((pipeline) => {
              return (
                <ListGroup.Item key={pipeline.id} variant="light" role="button">
                  <div>{pipeline.name}</div>
                  <div className={Styles.edit}>
                    <div
                      className={Styles.editText}
                      onClick={() => enterPipeline(pipeline)}
                    >
                      Editar
                    </div>
                    <Form>
                      <Form.Check
                        reverse
                        role="button"
                        label="Ativar/Desativar"
                        type="switch"
                        className="switch-actions"
                        id="custom-switch"
                        checked={pipeline.active}
                        onChange={() => activePipeline(pipeline)}
                      />
                    </Form>
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
