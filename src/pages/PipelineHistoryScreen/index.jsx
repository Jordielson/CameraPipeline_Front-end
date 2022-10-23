import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import Styles from "./styles.module.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import PipelineHistoryService from "../../services/pipeline_history";
import SidebarMenu from "../../components/SideBarMenu";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function PipelineHistoryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [versionList, setVersionList] = useState([]);

  useEffect(() => {
    fetchVersionList();
  }, []);

  function fetchVersionList() {
    PipelineHistoryService.getHistoric(location.state.pipeline.id)
      .then((response) => {
        setVersionList(response.content);
      }).catch ((error) => {
        let errorMessage = "";
        switch (error.response.status) {
          case 500:
            errorMessage = "Não foi possível carregar o histórico devido "+
              "a um erro interno, tente novamente mais tarde";
            break;
          default:
            errorMessage = "Não foi possível carregar o histórico de versão desse pipeline";
            break;
        }
        toast.error(<text id="toastMsg">{errorMessage}</text>);
      });
  }

  function restoreVersion(version) {
    PipelineHistoryService.restoreVersion(version)
      .then((response) => {
        navigate("../pipeline", { replace: true, state: response});
      }).catch ((error) => {
        let errorMessage = "";
        switch (error.response.status) {
          case 500:
            errorMessage = "Não foi possível restaurar essa versão devido "+
              "a um erro interno, tente novamente mais tarde";
            break;
          default:
            errorMessage = "Não foi possível restaurar essa versão da pipeline";
            break;
        }
        toast.error(<text id="toastMsg">{errorMessage}</text>);
      });
  }

  return (
    <>
      <div className="content">
        <SidebarMenu page={"pipeline"} />
        <div className="content-body">
          <nav className="navbar">
            <div className="container-fluid">
              <a className="navbar-brand navbar-dark">Histórico da Pipeline</a>
              <div className="d-flex flex-row align-items-center justify-content-end">
                <a href="/pipeline" className={Styles.back}>
                  Voltar
                </a>
              </div>
            </div>
          </nav>
          <ListGroup className="mx-4 mt-4 mb-1">
            {versionList.map((version) => {
              return (
                <ListGroup.Item key={version.revision} variant="light">
                  {new Date(version.dateTime).toLocaleString()}
                  <div className={"buttons " + Styles.listGroupItem}>
                    <button
                      className={"fa-solid fa-eye icon-actions " + Styles.iconListView}
                      title="Visualizar"
                      id={version.revision}
                      onClick={() => {}}
                    ></button>
                    <button
                      className={"fa-solid fa-history " + Styles.iconListView}
                      title="Restaurar versão"
                      id={version.revision}
                      onClick={() => restoreVersion(version.revision)}
                    ></button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    </>
  );
}

export default PipelineHistoryScreen;
