import { useState } from "react";
import TextField from "../common/form/textField";

const Calculator = () => {
  const [display, setDisplay] = useState("0");

  const handleInputChange = ({ target }) => {
    const { value } = target;
    const isNum = /^[0-9+\-*/]*$/.test(value);

    if (isNum) {
      setDisplay(value);
    }
  };

  return (
    <div
      className="calculator flex flex-col items-center rounded"
      style={{
        backgroundColor: "#EBEAE6",
        fontFamily: "'Space Mono', monospace"
      }}
    >
      <div className="p-4 mb-4">
        <TextField
          inputClass={"text-right"}
          name={"calculator"}
          value={display}
          validating={false}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button>1</button>
      </div>
    </div>
  );
};

export default Calculator;
