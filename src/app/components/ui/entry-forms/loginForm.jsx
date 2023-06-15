import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import TextField from "../../common/form/textField";
import validationSchema from "../../../utils/validators/validationSchema";

const LoginForm = ({ entryBtnText }) => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setInputFields((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    validationSchema
      .validate(inputFields, { abortEarly: false })
      .then(setErrors({}))
      .catch(({ inner }) => {
        const newErrors = {};
        for (const error of inner) {
          newErrors[error.path] = error.message;
        }
        setErrors(newErrors);
      });
  }, [inputFields]);

  const hasErrors = Object.keys(errors).length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasErrors) {
      console.log(inputFields);
    }
  };

  const handleForgotPassword = () => {
    // здесь ваш код для восстановления пароля
    console.log("Запрос на восстановление пароля");
  };

  const handleRegistration = () => {
    // здесь ваш код для регистрации
    console.log("Регистрация");
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errors.server && (
        <Alert variant="danger" className="mb-3">
          {errors.server}
        </Alert>
      )}
      <TextField
        label={"Email"}
        name={"email"}
        value={inputFields.email}
        onChange={handleInputChange}
        error={errors.email}
        tabIndex="1"
      />
      <TextField
        label={"Password"}
        name={"password"}
        value={inputFields.password}
        type={"password"}
        onChange={handleInputChange}
        error={errors.password}
        tabIndex="2"
      />
      <div className="d-flex justify-content-end mb-3">
        <Button variant="link" onClick={handleForgotPassword}>
          Забыли пароль?
        </Button>
      </div>
      <Button
        className="w-100 mx-auto mt-3"
        variant="primary"
        type="submit"
        disabled={hasErrors}
      >
        {entryBtnText}
      </Button>
      <div className="text-center mt-3">
        <Button variant="link" onClick={handleRegistration}>
          Регистрация
        </Button>
      </div>
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
