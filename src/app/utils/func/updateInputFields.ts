import { Dispatch, SetStateAction } from "react";

type InputFields = {
  [key: string]: string;
};

type Target = {
  name: string;
  value: string;
};

const updateInputFields = (
  target: Target,
  setInputFields: Dispatch<SetStateAction<InputFields>>
) => {
  const { name, value } = target;

  setInputFields((prev) => ({
    ...prev,
    [name]: value
  }));
};

export default updateInputFields;
