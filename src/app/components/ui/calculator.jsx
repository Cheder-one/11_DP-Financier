import { useState } from "react";
import TextField from "../common/form/textField";

const Calculator = () => {
  const [display, setDisplay] = useState("0");

  const handleInputChange = ({ target }) => {
    const { value } = target;
    const isNum = /^[\d+\-*/%().]*$/.test(value);

    if (isNum) {
      setDisplay(value);
    }
  };

  return (
    <div className="calculator w-44 flex flex-col rounded bg-[#EBEAE6] font-space-mono-bold">
      <TextField
        containerClass={"px-2 mb-4"}
        inputClass={"text-right h-1/2"}
        name={"calculator"}
        value={display}
        validating={false}
        onChange={handleInputChange}
      />
      <div className="grid grid-cols-2 pb-4">
        <div className="grid grid-cols-3 gap-2 mx-auto">
          <button className="w-8 h-5">7</button>
          <button className="w-8 h-5">8</button>
          <button className="w-8 h-5">9</button>
          <button className="w-8 h-5">4</button>
          <button className="w-8 h-5">5</button>
          <button className="w-8 h-5">6</button>
          <button className="w-8 h-5">1</button>
          <button className="w-8 h-5">2</button>
          <button className="w-8 h-5">3</button>
          <button className="w-8 h-5">0</button>
          <button className="w-8 h-5">.</button>
          <div className="items-end">
            <button className="w-8 h-5 text-xs">DEL</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 m-auto text-[#ABA6A3]">
          <button className="w-8 h-5">/</button>
          <button className="w-8 h-5">(</button>
          <button className="w-8 h-5">x</button>
          <button className="w-8 h-5">)</button>
          <button className="w-8 h-5">-</button>
          <button className="text-red-50 bg-red-500 focus:outline-none active:bg-red-600 active:text-white rounded-md row-span-2 w-8 h-10 mt-[7px]">
            =
          </button>
          <button className="w-8 h-5">+</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
