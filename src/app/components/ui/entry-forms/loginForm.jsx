import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import TextField from "../../common/form/textField";

const LoginForm = () => {
  const [formControl, setFormControl] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleControlChange = ({ target }) => {
    const { name, value } = target;

    setFormControl((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Form>
      <TextField
        label={"Email"}
        name={"email"}
        value={formControl.email}
        onChange={handleControlChange}
        error={errors.email}
      />
      <TextField
        label={"Password"}
        name={"password"}
        value={formControl.password}
        type={"password"}
        onChange={handleControlChange}
        error={errors.password}
      />
      <Button
        className="w-100 mx-auto mt-3"
        variant="primary"
        onClick={() => console.log("Primary")}
      >
        Entry
      </Button>
    </Form>
  );
};

export default LoginForm;
