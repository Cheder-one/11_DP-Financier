import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

import { updateInputFields, validationSchema } from "../../../utils";
import TextField from "../../common/form/input-field/textField";
import { CheckboxField } from "../../common/form";
import { useFormValidation } from "../../../hooks";

const LoginForm = () => {
  const { loginSchema } = validationSchema;
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    stayOn: false
  });
  const errors = useFormValidation(inputFields, loginSchema);
  const hasErrors = Object.keys(errors).length;

  const handleInputChange = ({ target }) => {
    updateInputFields(target, setInputFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasErrors) return;

    if (inputFields.stayOn) {
      localStorage.setItem("email", inputFields.email);
      localStorage.setItem("password", inputFields.password);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    // Отправка на сервер
    console.log(inputFields);

    // Выполнить вход в систему
    // login(inputFields.email, inputFields.password);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setInputFields((prev) => ({
        ...prev,
        email: savedEmail,
        password: savedPassword,
        stayOn: true
      }));
    }
  }, []);

  const handleForgotPassword = () => {
    // код для восстановления пароля
    console.log("Запрос на восстановление пароля");
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
      />
      <TextField
        label={"Password"}
        name={"password"}
        value={inputFields.password}
        type={"password"}
        onChange={handleInputChange}
        error={errors.password}
      />
      <div className="flex justify-between my-3">
        <CheckboxField
          name="stayOn"
          value={inputFields.stayOn}
          onChange={handleInputChange}
        >
          <span style={{ fontSize: "15px" }}>Оставаться в системе</span>
        </CheckboxField>
        <Button
          variant="link"
          className="btn-sm p-0"
          onClick={handleForgotPassword}
        >
          Забыли пароль?
        </Button>
      </div>
      <Button
        className="w-100 mx-auto "
        variant="primary"
        type="submit"
        // disabled={hasErrors}
      >
        Войти
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  entryBtnText: PropTypes.string
};

export default LoginForm;
