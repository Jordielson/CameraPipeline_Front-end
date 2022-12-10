import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./Tags.module.css";

function TagsInput(props) {
  const [textInput, setTextInput] = useState('');

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;

    addValue();
  }

  function addValue() {
    if (!textInput.trim()) return;
    if (props.value.includes(textInput.toUpperCase())) return;
    
    console.log(textInput);
    props.onChange([...props.value, textInput.toUpperCase()]);

    setTextInput("");
  }



  function removeTag(index) {
    props.onChange(props.value.filter((el, i) => i !== index));
  }

  return (
    <div className={styles.tagsInputContainer}>
      {props.value.map((tag, index) => (
        <div className={styles.tagItem} key={index} id={`tag-${index}`}>
          <span className={styles.text}>{tag}</span>
          <span onClick={() => removeTag(index)} className={styles.close} id={`tag-remove-${index}`}>
            &times;
          </span>
        </div>
      ))}
      <div className={styles.inputC}>
        <Form.Control
          id={"tag-input-id"}
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite as opções da seleção"
          className={styles.tagsInput + " inputPerson"}
          as="input"
          rows={1}
        />
        <button className={"btn btn-color " + styles.addButton} onClick={addValue} id={'tag-button-id'}>
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default TagsInput;
