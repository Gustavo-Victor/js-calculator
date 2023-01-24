import { useState, useEffect } from "react";
import Keyboard from "../Keyboard";
import Display from "../Display";
import { calcDataType, StrOrNum } from "../../types/AppTypes";
import "./style.scss";

const calcData: Array<calcDataType> = [
  { id: "clear", value: "AC", styles: "" },
  { id: "divide", value: "/", styles: "" },
  { id: "multiply", value: "x", styles: "" },
  { id: "seven", value: 7, styles: "digit" },
  { id: "eight", value: 8, styles: "digit" },
  { id: "nine", value: 9, styles: "digit" },
  { id: "subtract", value: "-", styles: "" },
  { id: "four", value: 4, styles: "digit" },
  { id: "five", value: 5, styles: "digit" },
  { id: "six", value: 6, styles: "digit" },
  { id: "add", value: "+", styles: "" },
  { id: "one", value: 1, styles: "digit" },
  { id: "two", value: 2, styles: "digit" },
  { id: "three", value: 3, styles: "digit" },
  { id: "equals", value: "=", styles: "" },
  { id: "zero", value: 0, styles: "digit" },
  { id: "decimal", value: ".", styles: "digit" },
];
const operators: Array<string> = ["AC", "/", "x", "+", "-", "="];
const numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function Calculator() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calculatorData, setCalculatorData] = useState("");

  const handleSubmit = () => {
    const total = eval(calculatorData);
    setInput(`${total}`);
    setCalculatorData(`${total}`);
  };

  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  };

  const handleNumbers = (value: StrOrNum) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChat = calculatorData.charAt(calculatorData.length - 1);
        const isLastChatOperator =
          lastChat === "*" || operators.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  const handleDecimal = () => {
    const lastChat = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(
          lastChat === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChat === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  };

  const handleOperators = (value: StrOrNum) => {
    const beforeLastChat = calculatorData.charAt(calculatorData.length - 2);
    const beforeLastChatIsOperator =
      operators.includes(beforeLastChat) || beforeLastChat === "*";
    const lastChat = calculatorData.charAt(calculatorData.length - 1);
    const lastChatIsOperator = operators.includes(lastChat) || lastChat === "*";
    const validOp = value === "x" ? "*" : value;
    let updatedValue = "";

    if (calculatorData.length) {
      setInput(`${value}`);
      if (
        (lastChatIsOperator && value !== "-") ||
        (beforeLastChatIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastChatIsOperator) {
          updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${value}`;
        } else {
          updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 1
          )}${validOp}`;
        }
      } else {
        updatedValue = `${calculatorData}${validOp}`;
      }
      setCalculatorData(updatedValue);
    }
  };

  const handleInput = (value: StrOrNum) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        handleDecimal();
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(calculatorData);
  };

  useEffect(() => {
    handleOutput();
  }, [calculatorData]);

  return (
    <div className="calculator">
      <Display input={input} output={output} />
      <Keyboard calcData={calcData} handleInput={handleInput} />
    </div>
  );
}

export default Calculator;
