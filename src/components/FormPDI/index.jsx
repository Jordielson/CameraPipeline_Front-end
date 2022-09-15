import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import PDIService from "./../../services/pdi";
import styles from "./Pdi.module.css";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

function FormPDI(props) {
  const [PDIName, setPDIName] = useState("");
  const [url, setUrl] = useState("");
  const [parameters, setParameters] = useState([]);
  const [show, setShow] = useState(false);
  const [duplicatedParam, setDuplicatedParam] = useState();

  useEffect(() => {
    if (props.obj) {
      setUrl(props.obj.url);
      setPDIName(props.obj.name);
      setParameters(props.obj.parameters);
      console.log(parameters, "UE", props.obj);
    }
  }, [props]);

  async function saveHandler() {
    const pdi = {
      name: PDIName,
      parameters: parameters,
      category: "PDI",
      url: url,
    };
    try {
      if (url.length == 0) {
        throw "emptyUrl";
      } else if (parameters.length == 0) {
        throw "emptyPdi";
      } else if (PDIName.length == 0) {
        throw "emptyName";
      }
      parameters.map((param) => {
        parameters.forEach((param1) => {
          if (param1.name == "") {
            throw `emptyparam`;
          }
          if (
            param.name.toUpperCase() == param1.name.toUpperCase() &&
            param.index != param1.index
          ) {
            throw `${param.name.toUpperCase()}`;
          }
        });
      });

      try {
        if (props.obj) {
          const response = await toast.promise(
            PDIService.update(pdi, props.obj.id),
            {
              pending: "Salvando",
              success: "Salvo com sucesso! ",
              error: "Promise rejected ",
            }
          );
        } else {
          await toast.promise(PDIService.register(pdi), {
            pending: "Salvando",
            success: "Salvo com sucesso! ",
            error: "Promise rejected ",
            position: "center",
            autoClose: 1000,
          });
        }
      } catch (error) {
        throw error;
      }

      props.hide();
      // PDIService.save(pdi);
      console.log(pdi, "pdi salva");
      setParameters([]);
      setUrl("");
      setPDIName("");
    } catch (e) {
      setShow(false);
      setDuplicatedParam("*Há parâmetros com nome Repetido: " + e);

      if (e == "emptyparam") {
        setDuplicatedParam("*Há parametros vazios");
      } else if (e == "emptyUrl") {
        setDuplicatedParam("*Insira o Url");
      } else if (e == "emptyPdi") {
        setDuplicatedParam("*Não há parametros");
      } else if (e == "emptyName") {
        setDuplicatedParam("Insira o NOME do PDI");
      } else {
        setDuplicatedParam("ERRO AO SALVAR");
      }
    }
  }
  function newParameterHandler() {
    var count = 0;
    parameters.map((param) => {
      param.index = count++;
    });

    const newParameter = {
      name: "",
      type: "STRING",
      required: false,
      index: parameters.length,
    };

    setParameters([...parameters, newParameter]);
    // setParameters((oldParameters) => {
    //   return oldParameters.sort(function (x, y) {
    //     return x.index - y.index;
    //   });
    // });
    console.log(parameters);
  }
  function exitHandler() {
    setParameters([]);
    setUrl("");
    setPDIName("");
    setShow(true);
  }
  function inputHandler(e) {
    setShow(true);

    parameters.map((param) => {
      if (param.index == e.target.id) {
        param.name = e.target.value;
      }
    });
    setParameters(parameters);
  }
  function selectHandler(e) {
    setShow(true);

    parameters.map((param) => {
      if (param.index == e.target.id) {
        param.type = e.target.value;
      }
    });
    setParameters(parameters);
  }
  function checkHandler(e) {
    setShow(true);

    parameters.map((param) => {
      if (param.index == e.target.id) {
        param.required = e.target.checked;
      }
    });
    setParameters(parameters);
  }
  function deleteHandler(e) {
    setShow(true);
    setParameters((oldParameters) => {
      return oldParameters.filter((param) => param.index !== e);
    });
  }
  function orderIndex() {
    var count = 0;
    parameters.map((param) => {
      param.index = count++;
    });
    const novoEstado = [...parameters];
    setParameters(novoEstado);
  }

  return (
    <>
      <Modal
        dialogClassName="modal-custom"
        show={props.show}
        onHide={props.hide}
        onExit={exitHandler}
      >
        <Modal.Header closeButton>
          <div className="modal-header-custom">
            <div className="d-flex ">
              <label
                for="name"
                className={styles.editname + " fa-solid fa-pen-to-square"}
              ></label>
              <Modal.Title>
                <input
                  className="input-custom"
                  // value={PDIName}
                  id="name"
                  defaultValue={PDIName}
                  placeholder={"Insira o nome do PDI"}
                  onChange={(value) => setPDIName(value.target.value)}
                ></input>
              </Modal.Title>
            </div>
            <div className="d-flex align-items-center">
              <span className="input-group-text" id="basic-addon3">
                URL
              </span>

              <input
                type="text"
                className="form-control"
                id="basic-url"
                aria-describedby="basic-addon3"
                placeholder="https://"
                value={url}
                onChange={(value) => setUrl(value.target.value)}
              ></input>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className={styles.modal}>
          {!show && <p className={styles.error}>{duplicatedParam}</p>}
          {parameters.map((param) => {
            return (
              <div key={param.index} className="card">
                <div className="card-body d-flex align-items-center">
                  <input
                    className="input-custom mx-1"
                    placeholder="insira o nome do parametro"
                    defaultValue={param.name}
                    id={param.index}
                    onChange={(e) => inputHandler(e)}
                  ></input>
                  <Form.Select
                    id={param.index}
                    value={param.type}
                    className="mx-2"
                    onChange={(e) => {
                      selectHandler(e);
                    }}
                  >
                    <option>STRING</option>
                    <option>NUMBER</option>
                  </Form.Select>
                  <Form.Check
                    // checked

                    className="mx-5"
                    type="switch"
                    defaultChecked={param.required}
                    id={param.index}
                    label="Obrigatório"
                    onChange={(e) => {
                      checkHandler(e);
                    }}
                  />
                  <i
                    className={styles.trash + " fa-solid fa-trash "}
                    id={param.index}
                    onClick={(e) => {
                      deleteHandler(param.index);
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <div className="col text-start ">
            <button
              className={styles.btnparam + " btn btn-outline-secondary"}
              type="button"
              id="button-addon2"
              onClick={newParameterHandler}
            >
              Novo Parametro
            </button>
          </div>
          <div className="col text-end">
            <button
              className="btn btn-primary no-shadow "
              type="button"
              id="button-addon2"
              onClick={saveHandler}
            >
              SALVAR
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormPDI;
