import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import Styles from "./styles.module.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import PipelineHistoryService from "../../services/pipeline_history";
import SidebarMenu from "../../components/SideBarMenu";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function PipelineHistoryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [versionList, setVersionList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVersionList();
  }, []);

  function fetchVersionList() {
    setLoading(true);
    PipelineHistoryService.getHistoric(location.state.pipeline.id)
      .then((response) => {
        setVersionList(response.content);
        setLoading(false);
      })
      .catch((error) => {
        let errorMessage = "";
        switch (error.response.status) {
          case 500:
            errorMessage =
              "Não foi possível carregar o histórico devido " +
              "a um erro interno, tente novamente mais tarde";
            break;
          default:
            errorMessage =
              "Não foi possível carregar o histórico de versão desse pipeline";
            break;
        }
        toast.error(<text id="toastMsg">{errorMessage}</text>);
      });
  }

  function viewVersion(version) {
    navigate("../pipeline", { replace: true, state: { pipeline: version } });
  }

  function restoreVersion(version) {
    PipelineHistoryService.restoreVersion(version)
      .then((response) => {
        navigate("../pipeline", {
          replace: true,
          state: { pipeline: response },
        });
      })
      .catch((error) => {
        let errorMessage = "";
        switch (error.response.status) {
          case 500:
            errorMessage =
              "Não foi possível restaurar essa versão devido " +
              "a um erro interno, tente novamente mais tarde";
            break;
          default:
            errorMessage = "Não foi possível restaurar essa versão da pipeline";
            break;
        }
        toast.error(<text id="toastMsg">{errorMessage}</text>);
      });
  }

  function goBack() {
    navigate("../pipeline", {
      replace: true,
      state: { pipeline: location.state.pipeline },
    });
  }

  function handleNameChange(revision, newName) {
    let arr = structuredClone(versionList);
    arr.map((version) => {
      if (version.revision === revision) {
        version.versionName = newName;
      }
    });
    setVersionList(arr);
  }

  function handleNameSave(revision, newName) {
    PipelineHistoryService.renameVersion(revision, newName).catch((error) => {
      let errorMessage = "";
      switch (error.response.status) {
        case 500:
          errorMessage =
            "Não foi possível renomear essa versão devido " +
            "a um erro interno, tente novamente mais tarde";
          break;
        default:
          errorMessage = "Não foi possível renomear essa versão da pipeline";
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
              <div className="pipeline-name d-flex mx-3">
                <h6
                  className="backbutton"
                  onClick={(e) => {
                    goBack();
                    // navigate("../pipeline-home", { replace: true });
                  }}
                  title="voltar"
                >
                  <AiOutlineLeft style={{ color: "white" }} title="voltar" />
                </h6>
                <a className="navbar-brand navbar-dark">
                  Histórico da Pipeline
                </a>
              </div>
              {/* <div className="d-flex flex-row align-items-center justify-content-end">
                <a
                  role={"button"}
                  onClick={(e) => goBack()}
                  className={Styles.back}
                >
                  Voltar
                </a>
              </div> */}
            </div>
          </nav>
          {loading && (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          )}
          <ListGroup className="mx-4 mt-4 mb-1">
            {versionList.map((version) => {
              return (
                <ListGroup.Item key={version.revision} variant="light">
                  <input
                    key={version.revision}
                    type="text"
                    onBlur={(e) =>
                      handleNameSave(version.revision, e.target.value)
                    }
                    onChange={(e) =>
                      handleNameChange(version.revision, e.target.value)
                    }
                    value={version.versionName}
                    placeholder={new Date(version.dateTime).toLocaleString()}
                    className="form-control-plaintext"
                  />
                  <div className={"buttons " + Styles.listGroupItem}>
                    {/* <button
                      className={"fa-solid fa-eye icon-actions " + Styles.iconListView}
                      title="Visualizar"
                      id={version.revision}
                      onClick={() => viewVersion(version)}
                    ></button> */}
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
