const updateInputFields = (target, setInputFields) => {
  const { name, value } = target;

  setInputFields((prev) => ({
    ...prev,
    [name]: value
  }));
};

export default updateInputFields;
