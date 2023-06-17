import { registerSchema } from "../../../utils/validators/validationSchema";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import TextField from "../../common/form/textField";
import CheckboxField from "../../common/form/checkboxField";
import { InputGroup } from "react-bootstrap";

function RegisterForm() {
  return (
    <Formik
      validationSchema={registerSchema}
      onSubmit={console.log}
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        terms: false
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Form.Group>
              {/* <Form.Label htmlFor={name}>{label}</Form.Label> */}
              <label htmlFor={"name"}>{"label"}</label>
              <InputGroup hasValidation>
                <Form.Control
                  id={"firstName"}
                  name={"firstName"}
                  value={values.firstName}
                  // type={showPass ? "text" : type}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  isValid={!errors.firstName}
                  isInvalid={!!errors.firstName}
                />

                <Form.Control.Feedback type="invalid">
                  {"error"}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <TextField
              as={Col}
              md="6"
              label={"First Name"}
              name={"firstName"}
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <TextField
              as={Col}
              md="6"
              label={"Last Name"}
              name={"lastName"}
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </Row>
          <Row>
            <TextField
              label={"Email"}
              name={"email"}
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />
          </Row>
          <Row>
            <TextField
              label={"Password"}
              name={"password"}
              type={"password"}
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />
          </Row>
          <CheckboxField
            name="terms"
            value={values.terms}
            onChange={handleChange}
            className="mb-3"
          >
            <button
              className="btn btn-link p-0"
              style={{ fontSize: "15px" }}
              href="#"
            >
              Agree to terms and conditions
            </button>
          </CheckboxField>
          <Button type="submit" className="w-100">
            Submit form
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
