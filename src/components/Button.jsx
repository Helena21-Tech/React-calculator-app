import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const btnAction = props.value.type === "action" ? classes.action : "";
  const btnOperand = props.value.type === "operand" ? classes.operand : "";
  const btnOperator = props.value.type === "operator" ? classes.operator : "";
  const doubleBtn = props.value.btn === 0 ? classes.double : "";

  const btnClickHandler = (event) => {
    const { value } = event.target.attributes.btntype;
    props.data(event.target.innerText, value);
  };
  return (
    <button
      onClick={btnClickHandler}
      btntype={props.value.type}
      className={`${classes.btn} ${btnAction} ${btnOperand} ${btnOperator} ${doubleBtn}`}
    >
      {props.value.btn}
    </button>
  );
};

export default Button;
