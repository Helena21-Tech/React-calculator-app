import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import DisplayScreen from "./components/DisplayScreen";

const calculatorBtns = [
  { btn: "AC", type: "action" },
  { btn: "+/-", type: "action" },
  { btn: "%", type: "action" },
  { btn: "/", type: "operator" },
  { btn: 7, type: "operand" },
  { btn: 8, type: "operand" },
  { btn: 9, type: "operand" },
  { btn: "x", type: "operator" },
  { btn: 4, type: "operand" },
  { btn: 5, type: "operand" },
  { btn: 6, type: "operand" },
  { btn: "-", type: "operator" },
  { btn: 1, type: "operand" },
  { btn: 2, type: "operand" },
  { btn: 3, type: "operand" },
  { btn: "+", type: "operator" },
  { btn: 0, type: "operand" },
  { btn: ".", type: "operand" },
  { btn: "=", type: "operator" },
];
function App() {
  const [btnData, setBtnData] = useState({
    btn: 0,
    type: null,
  });

  const btnValueHandler = (btn, type) => {
    setBtnData((prevState) => {
      return {
        btn,
        type,
      };
    });
  };
  return (
    <main className="calculator">
      <DisplayScreen data={btnData} />
      <div className="btns">
        {calculatorBtns.map((btn) => {
          return <Button key={btn.btn} data={btnValueHandler} value={btn} />;
        })}
      </div>
    </main>
  );
}

export default App;
