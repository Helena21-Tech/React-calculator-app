import React, { useEffect, useReducer } from "react";
import classes from "./DisplayScreen.module.css";

const initialState = {
  prevOperand: "",
  operation: "",
  curOperand: 0,
  overwrite: false,
};
const evaluate = ({ prevOperand, curOperand, operation }) => {
  const prev = +prevOperand;
  const cur = +curOperand;
  switch (operation) {
    case "+":
      return prev + cur;
      break;
    case "-":
      return prev - cur;
      break;
    case "/":
      return prev / cur;
      break;
    case "*":
      return prev * cur;
      break;
  }
};
const calculate = (operand, operation) => {
  console.log(operand, operation);
  switch (operation) {
    case "%":
      return +operand / 100;
      break;
    case "AC":
      return (operand = "");
      break;
    case "+/-":
      return +operand * -1;
      break;
  }
};
const calcReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_DIGITS":
      if (prevState.overwrite) {
        return {
          ...prevState,
          curOperand: action.payload,
          overwrite: false,
        };
      }
      return {
        ...prevState,
        curOperand: `${prevState.curOperand || ""}${action.payload}`,
      };
      break;
    case "CHOOSE_OPERATION":
      if (prevState.prevOperand === "" && prevState.curOperand === "") return;
      else if (prevState.prevOperand === "") {
        return {
          ...prevState,
          prevOperand: prevState.curOperand,
          operation: action.payload,
          curOperand: "",
        };
      } else {
        return {
          ...prevState,
          prevOperand: evaluate(prevState),
          operation: action.payload,
          curOperand: "",
        };
      }
      break;
    case "ACTION":
      if (prevState.curOperand !== "") {
        return {
          ...prevState,
          operation: "",
          overwrite: true,
          curOperand: calculate(prevState.curOperand, action.payload),
        };
      }
      break;
    case "COMPUTE":
      if (prevState.curOperand !== "" && prevState.prevOperand !== "") {
        return {
          ...prevState,
          curOperand: evaluate(prevState),
          overwrite: true,
          prevOperand: "",
          operation: "",
        };
      }
  }
};
const DisplayScreen = (props) => {
  const [{ prevOperand, curOperand, operation }, dispatchAction] = useReducer(
    calcReducer,
    initialState
  );

  const { btn, type } = props.data;
  useEffect(() => {
    switch (type) {
      case "operand":
        dispatchAction({ type: "ADD_DIGITS", payload: btn });
        break;
      case "operator":
        if (btn !== "=") {
          dispatchAction({ type: "CHOOSE_OPERATION", payload: btn });
        } else {
          dispatchAction({ type: "COMPUTE" });
        }
        break;
      case "action":
        dispatchAction({ type: "ACTION", payload: btn });
        break;
    }
  }, [btn, type]);
  console.log(prevOperand, curOperand);
  return (
    <div className={classes["display_screen"]}>
      <div className={classes.prev}>
        {prevOperand} {operation}
      </div>
      <div className={classes.cur}> {curOperand}</div>
    </div>
  );
};

export default DisplayScreen;
