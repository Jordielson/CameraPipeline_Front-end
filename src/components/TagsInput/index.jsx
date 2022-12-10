import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./Tags.module.css";

function TagsInput(props) {
  const [textInput, setTextInput] = useState('');

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;

    const value = e.target.value;

    if (!value.trim()) return;
    if (props.value.includes(value)) return;

    addValue();
  }

  function addValue() {
    props.onChange([...props.value, textInput]);

    setTextInput("");
  }



  function removeTag(index) {
    props.onChange(props.value.filter((el, i) => i !== index));
  }

  return (
    <div className={styles.tagsInputContainer}>
      {props.value.map((tag, index) => (
        <div className={styles.tagItem} key={index}>
          <span className={styles.text}>{tag}</span>
          <span onClick={() => removeTag(index)} className={styles.close}>
            &times;
          </span>
        </div>
      ))}
      <div className={styles.inputC}>
        <Form.Control
          id={"taginputid"}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite as opções da seleção"
          className={styles.tagsInput + " inputPerson"}
          as="input"
          rows={1}
        />
        <button className={"btn btn-color " + styles.addButton} onClick={addValue}>
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default TagsInput;
