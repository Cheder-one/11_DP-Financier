const validateDropdownRequired = (value: { id: string; name: string }) => {
  if (value && typeof value === "object") {
    return "id" in value && "name" in value;
  }
  return false;
};

export default validateDropdownRequired;
