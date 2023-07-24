import { useState } from "react";

import TextField from "../common/form/textField";
import { constantsData } from "../../utils";
import useEventListener from "../../hooks/useEventListener";
import { evaluate } from "mathjs";
const { NUMPAD, OPERATORS } = constantsData;

const Calculator = () => {
  const [display, setDisplay] = useState("0");

  const handleInputChange = ({ target }) => {
    const { value } = target;
    const isValid = /^[\d+\-*/%().]*$/.test(value);

    if (isValid) {
      setDisplay(value);
    }
  };

  const handleClick = ({ target }) => {
    const { value } = target;

    if (value) {
      setDisplay((prev) => {
        if (prev === "0") {
          return value;
        }
        return (prev += value);
      });
    }
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleEval = () => {
    try {
      const result = evaluate(display);
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  const handleKeyPress = ({ keyCode }) => {
    if (keyCode === 13) {
      handleEval();
    }
  };

  useEventListener("keydown", handleKeyPress);

  return (
    <div className="calculator inline-block w-44 rounded bg-[#EBEAE6] font-space-mono-bold select-none">
      <TextField
        containerClass={"px-2 mb-4"}
        inputClass={"text-right"}
        name={"calculator"}
        value={display}
        validating={false}
        onChange={handleInputChange}
      />
      <div className="numpad grid grid-cols-2 pb-4" onClick={handleClick}>
        <div className="grid grid-cols-3 gap-2 mx-auto">
          {NUMPAD.map((num) => (
            <button key={num} className="w-8 h-5" value={num}>
              {num}
            </button>
          ))}
          <div className="items-end" onClick={handleClear}>
            <button className="w-8 h-5 text-xs">DEL</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-1 gap-y-2 m-auto text-[#ABA6A3]">
          {OPERATORS.map((num) => (
            <button key={num} className="w-8 h-5" value={num}>
              {num}
            </button>
          ))}
          <button
            className="w-8 h-10 mt-[7px] row-span-2 text-red-50 bg-red-500 active:bg-red-600 rounded-md"
            onClick={handleEval}
          >
            =
          </button>
          <button className="w-8 h-5" value={"+"}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
