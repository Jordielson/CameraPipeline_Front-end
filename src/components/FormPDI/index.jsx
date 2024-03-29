import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import PDIService from "./../../services/pdi";
import styles from "./Pdi.module.css";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForceUpdate } from "../../shared/Utils";
import TagsInput from "../TagsInput";

function FormPDI(props) {
  const [PDIName, setPDIName] = useState("");
  const [url, setUrl] = useState("");
  const [parameters, setParameters] = useState([]);
  const [show, setShow] = useState(false);
  const [duplicatedParam, setDuplicatedParam] = useState();
  const [description, setDescription] = useState();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (props.obj) {
      setUrl(props.obj.url);
      setPDIName(props.obj.name);
      setParameters(props.obj.parameters);
      setDescription(props.obj.description);
    }
  }, [props]);

  useEffect(() => {}, []);

  async function saveHandler() {
    const pdi = {
      name: PDIName,
      description: description,
      parameters: parameters,
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
          const verifyName = await PDIService.verifyName({
            name: PDIName,
            id: props.obj.id,
          });
          const verifyUrl = await PDIService.verifyUrl({
            url: url,
            id: props.obj.id,
          });

          if (!verifyName.valid) {
            throw "nameExists";
          }
          if (!verifyUrl.valid) {
            throw "urlExists";
          }

          await toast.promise(PDIService.update(pdi, props.obj.id), {
            pending: {
              render({ data }) {
                return <text id="toastMsg">Salvando</text>;
              },
            },
            success: {
              render({ data }) {
                return <text id="toastMsg">Salvo com sucesso!</text>;
              },
            },
            error: {
              render({ data }) {
                return <text id="toastMsg">Erro ao salvar</text>;
              },
            },
          });
        } else {
          const verifyName = await PDIService.verifyName({
            name: PDIName,
          });
          const verifyUrl = await PDIService.verifyUrl({ url: url });

          if (!verifyName.valid) {
            throw "nameExists";
          }
          if (!verifyUrl.valid) {
            throw "urlExists";
          }
          await toast.promise(PDIService.register(pdi), {
            pending: {
              render({ data }) {
                return <text id="toastMsg">Salvando!</text>;
              },
            },
            success: {
              render({ data }) {
                return <text id="toastMsg">Salvo com sucesso!</text>;
              },
            },
            error: {
              render({ data }) {
                return <text id="toastMsg">Erro ao salvar</text>;
              },
            },
            position: "center",
            autoClose: 1000,
          });
        }
      } catch (error) {
        throw error;
      }

      props.hide();
      setParameters([]);
      setUrl("");
      setPDIName("");
      setDescription("");
    } catch (e) {
      setShow(false);
      setDuplicatedParam("*Há parâmetros com nome Repetido: " + e);

      if (e == "emptyparam") {
        setDuplicatedParam("*Há parâmetros vazios");
      } else if (e == "emptyUrl") {
        setDuplicatedParam("*Insira o Url");
      } else if (e == "emptyPdi") {
        setDuplicatedParam("*Não há parâmetros");
      } else if (e == "emptyName") {
        setDuplicatedParam("Insira o NOME do serviço");
      } else if (e == "nameExists") {
        setDuplicatedParam("O nome do serviço já foi cadastrado");
      } else if (e == "urlExists") {
        setDuplicatedParam("O url da serviço já foi cadastrado");
      } else {
        setDuplicatedParam("ERRO AO SALVAR");
      }
    }
  }
  function newParameterHandler() {
    // var count = 0;
    var maxId = 0;
    Promise.all(
      parameters.map((param) => {
        // param.index = count++;
        if (param.index > maxId) {
          maxId = param.index;
        }
      })
    );

    const newParameter = {
      // id: maxId + 1,
      name: "",
      type: "STRING",
      required: false,
      index: maxId + 1,
    };

    setParameters([...parameters, newParameter]);
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

    setParameters((oldParameters) => {
      const index = oldParameters.findIndex((i) => i.index == e.target.id);

      oldParameters[index].type = e.target.value;

      return oldParameters;
    });
    forceUpdate();
  }
  // function selectHandler(e) {
  //   setShow(true);

  //   parameters.map((param) => {
  //     if (param.index == e.target.id) {
  //       param.type = e.target.value;
  //     }
  //   });
  //   setParameters(parameters);
  // }
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
  function handleDescritionParameter(e) {
    setShow(true);

    parameters.map((param) => {
      if (param.index == e.target.id) {
        param.description = e.target.value;
      }
    });
    setParameters(parameters);
  }
  useEffect(() => {}, [setParameters]);
  useEffect(() => {}, [parameters]);

  return (
    <>
      <Modal
        dialogClassName="modal-custom"
        show={props.show}
        onHide={props.hide}
        onExit={exitHandler}
      >
        <Modal.Header closeButton>
          <div className={styles.modalHeader}>
            <div className="d-flex align-items-center ">
              <label
                htmlFor="name"
                className={styles.editname + "  fa-solid fa-pen-to-square"}
              ></label>
              <Modal.Title>
                <Form.Control
                  // className="input-custom"
                  className="input-custom mx-2 "
                  // value={PDIName}
                  id="name"
                  defaultValue={PDIName}
                  placeholder={"Insira o nome do serviço"}
                  onChange={(value) => setPDIName(value.target.value)}
                ></Form.Control>
              </Modal.Title>
            </div>
            <div className="d-flex align-items-center">
              <span className="input-group-text" id="basic-addon3">
                URL
              </span>

              <input
                type="text"
                className="form-control inputPerson"
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
          <div className={styles.formPdi}>
            <Form.Label className={styles.formDescLabel}>
              Decrição do serviço
            </Form.Label>
            <Form.Control
              value={description} //
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="inputPerson"
              as="textarea"
              rows={1}
            />
          </div>
          {!show && <p className={styles.error}>{duplicatedParam}</p>}
          {parameters.map((param) => {
            return (
              <div key={param.index} className={"card " + styles.margin}>
                <div className="card-body d-flex align-items-center">
                  <Form.Control
                    className="input-custom mx-1"
                    placeholder="insira o nome do parâmetro"
                    defaultValue={param.name}
                    id={param.index}
                    onChange={(e) => inputHandler(e)}
                  ></Form.Control>
                  <Form.Select
                    key={param.index}
                    id={param.index}
                    defaultValue={param.type}
                    className="mx-2 inputPerson"
                    onChange={(e) => {
                      selectHandler(e);
                    }}
                  >
                    <option className="inputselect" value="STRING">
                      STRING
                    </option>
                    <option value="NUMBER">NUMBER</option>
                    <option value="BOOLEAN">BOOLEAN</option>
                    <option value="FILE">FILE</option>
                    <option value="SELECT">SELECT</option>
                    <option value="COLOR">COLOR</option>
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
                {param.type == "SELECT" ? (
                  <div className={styles.formTags}>
                    <Form.Label className={"px-2 " + styles.opt}>
                      Opções
                    </Form.Label>
                    <TagsInput
                      className={styles.tags}
                      value={param.selectOptions ?? []}
                      onChange={(value) => {
                        param.selectOptions = value;
                        forceUpdate();
                      }}
                      placeHolder="Digite as opções da seleção"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.formTxt}>
                  <Form.Label className={"px-2 " + styles.descw}>
                    Descrição
                  </Form.Label>
                  <Form.Control
                    id={param.index}
                    defaultValue={param.description}
                    onChange={(e) => {
                      handleDescritionParameter(e);
                    }}
                    className="inputPerson"
                    as="textarea"
                    rows={1}
                  />
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
              Novo Parâmetro
            </button>
          </div>
          <div className="col text-end">
            <button
              className="btn btn-color no-shadow "
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
