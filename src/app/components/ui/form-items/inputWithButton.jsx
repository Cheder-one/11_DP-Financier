import { InputField } from "../../common/form";

const InputWithButton = ({ onChange }) => {
  return (
    <InputField
      name={"newCategory"}
      containerClass={"flex"}
      inputClass={
        "rounded-lg w-full border-2 px-2 focus:outline-none focus:border-blue-500"
      }
      onChange={onChange}
    >
      <div className="mx-1 px-2 my-1 border-2 rounded transition-transform duration-200 transform hover:scale-100 hover:outline-none hover:ring-2 hover:ring-green-500 hover:ring-opacity-50  active:scale-95">
        +
      </div>
    </InputField>
  );
};

export default InputWithButton;
