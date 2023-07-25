const inputChange = (target, setInputFields) => {
  const { name, value } = target;

  setInputFields((prev) => ({
    ...prev,
    [name]: value
  }));
};

export default inputChange;
