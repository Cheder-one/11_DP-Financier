import { registerSchema } from "../../../utils/validators/validationSchema";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import TextField from "../../common/form/textField";
import CheckboxField from "../../common/form/checkboxField";

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
          >
            <button className="btn btn-link p-0" href="#">
              Agree to terms and conditions
            </button>
          </CheckboxField>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
