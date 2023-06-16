import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import TextField from "../../common/form/textField";
import validationSchema from "../../../utils/validators/validationSchema";
import CheckboxField from "../../common/form/checkboxField";
import ContentBetween from "../../common/typography/contentBetween";

const LoginForm = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
    stayOn: false
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

  // Проверить наличие сохраненных данных в localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setInputFields((prev) => ({
        ...prev,
        email: savedEmail,
        password: savedPassword
      }));
      setInputFields((prev) => ({ ...prev, stayOn: true }));
    }
  }, []);

  const handleForgotPassword = () => {
    // код для восстановления пароля
    console.log("Запрос на восстановление пароля");
  };

  const handleRegistration = () => {
    // код для регистрации
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
      />
      <TextField
        label={"Password"}
        name={"password"}
        value={inputFields.password}
        type={"password"}
        onChange={handleInputChange}
        error={errors.password}
      />
      <ContentBetween className="my-3">
        <CheckboxField
          label="Оставаться в системе"
          name="stayOn"
          value={inputFields.stayOn}
          onChange={handleInputChange}
        />
        <Button
          variant="link"
          className="btn-sm p-0"
          onClick={handleForgotPassword}
        >
          Забыли пароль?
        </Button>
      </ContentBetween>
      <Button
        className="w-100 mx-auto "
        variant="primary"
        type="submit"
        disabled={hasErrors}
      >
        Войти
      </Button>
      <div className="text-center mt-2">
        <Button variant="link" onClick={handleRegistration}>
          Регистрация
        </Button>
      </div>
    </Form>
  );
};

LoginForm.propTypes = {
  entryBtnText: PropTypes.string
};

export default LoginForm;
