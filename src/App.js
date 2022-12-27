import "./calculator.css";
import React, { useState } from "react";
import buttons from "./buttons";

function App() {
  const [display, setDisplay] = useState("0");
  const [lastButton, setLastButton] = useState("clear");
  const [calculation, setCalculation] = useState(false);
  const [decimal, setDecimal] = useState(false);

  const changeDisplay = (value) => {
    if (calculation) {
      if (value === "+" || value === "-" || value === "/" || value === "*") {
        setDisplay(`${lastButton}${value}`);
      } else {
        setDisplay(value);
      }
      setCalculation(false);
    } else if (value === ".") {
      if (!decimal) {
        setDecimal(true);
        setDisplay(`${display}${value}`);
      }
    } else if (
      value === "+" ||
      value === "-" ||
      value === "/" ||
      value === "*"
    ) {
      setDecimal(false);
      if (lastButton === "+" || lastButton === "-" || lastButton === "/") {
        setDisplay(`${display.slice(0, -1)}${value}`);
      } else if (lastButton === "*") {
        if (value === "/") {
          setDisplay(`${display.slice(0, -1)}${value}`);
        } else if (value !== "*") {
          setDisplay(`${display}${value}`);
        }
      } else {
        setDisplay(`${display}${value}`);
      }
    } else {
      if (display === "0") {
        setDisplay(value);
      } else {
        setDisplay(`${display}${value}`);
      }
    }
    setLastButton(value);
  };

  const clearAll = () => {
    setDisplay("0");
    setLastButton("clear");
  };

  const clearLastInput = () => {
    const newDisplay = display.slice(0, -1);
    newDisplay === "" ? setDisplay("0") : setDisplay(newDisplay);
    setLastButton("c");
  };

  const calculate = () => {
    // eslint-disable-next-line no-eval
    const result = eval(display);
    setDisplay(`${display}=${result}`);
    setLastButton(result);
    setCalculation(true);
  };

  return (
    <div className="container">
      <div className="display">
        <div className="result" id="display">
          {display}
        </div>
        <div className="input">{lastButton}</div>
      </div>
      <div className="pads">
        <div className="pad-row">
          <button id="clear" className="cleaner" onClick={clearAll}>
            Clear
          </button>
          <button id="divide" onClick={() => changeDisplay("/")}>
            /
          </button>
        </div>
        <div className="pad-row">
          {buttons[0].map((element) => (
            <button
              id={element.name}
              key={element.name}
              onClick={() => changeDisplay(element.symbol)}
            >
              {" "}
              {element.symbol}
            </button>
          ))}
        </div>
        <div className="pad-row">
          {buttons[1].map((element) => (
            <button
              id={element.name}
              key={element.name}
              onClick={() => changeDisplay(element.symbol)}
            >
              {" "}
              {element.symbol}
            </button>
          ))}
        </div>
        <div className="pad-row">
          {buttons[2].map((element) => (
            <button
              id={element.name}
              key={element.name}
              onClick={() => changeDisplay(element.symbol)}
            >
              {" "}
              {element.symbol}
            </button>
          ))}
        </div>
        <div className="pad-row">
          {buttons[3].map((element) => (
            <button
              id={element.name}
              key={element.name}
              onClick={() => changeDisplay(element.symbol)}
            >
              {" "}
              {element.symbol}
            </button>
          ))}
          <button onClick={clearLastInput}>C</button>
          <button id="equals" onClick={calculate}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
