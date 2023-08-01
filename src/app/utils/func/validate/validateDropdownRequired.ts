const validateDropdownRequired = (value: {
  id: string;
  name: string;
}) => {
  if (value && typeof value === "object") {
    if (value.id !== undefined && value.name !== undefined) {
      return value.id.trim() !== "" && value.name.trim() !== "";
    }
  }

  return false;
};

export default validateDropdownRequired;
