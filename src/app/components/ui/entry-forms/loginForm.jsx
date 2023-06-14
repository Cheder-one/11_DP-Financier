import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import TextField from "../../common/form/textField";
import validationSchema from "../../../utils/validators/validationSchema";

const LoginForm = ({ entryBtnText }) => {
  const [inputsData, setInputsData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleControlChange = ({ target }) => {
    const { name, value } = target;

    setInputsData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    validationSchema
      .validate(inputsData, { abortEarly: false })
      .then(setErrors({}))
      .catch(({ inner }) => {
        for (const error of inner) {
          setErrors((prev) => ({
            ...prev,
            [error.path]: error.message
          }));
        }
      });
  }, [inputsData]);

  return (
    <Form>
      <TextField
        label={"Email"}
        name={"email"}
        value={inputsData.email}
        onChange={handleControlChange}
        error={errors.email}
      />
      <TextField
        label={"Password"}
        name={"password"}
        value={inputsData.password}
        type={"password"}
        onChange={handleControlChange}
        error={errors.password}
      />
      <Button
        className="w-100 mx-auto mt-3"
        variant="primary"
        onClick={() => console.log("Primary")}
      >
        {entryBtnText}
      </Button>
    </Form>
  );
};

LoginForm.defaultProps = {
  entryBtnText: "Войти"
};

LoginForm.propTypes = {
  entryBtnText: PropTypes.string
};

export default LoginForm;
