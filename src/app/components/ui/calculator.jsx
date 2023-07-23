import { useState } from "react";
import { Button } from "react-bootstrap";
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

  const handleButtonClick = (buttonValue) => {
    setDisplay((prevDisplay) => prevDisplay + buttonValue);
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleCalculate = () => {
    try {
      setDisplay(eval(display).toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  return (
    <div
      className="flex flex-col items-center rounded"
      style={{ backgroundColor: "#EBEAE6" }}
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
      <div className="grid grid-cols-4 gap-2">''</div>
    </div>
  );
};

export default Calculator;
