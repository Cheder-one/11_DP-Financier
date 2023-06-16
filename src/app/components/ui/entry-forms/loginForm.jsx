import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import TextField from "../../common/form/textField";
import { loginSchema } from "../../../utils/validators/validationSchema";
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
    loginSchema
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
      <ContentBetween className="my-3">
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
      </ContentBetween>
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
