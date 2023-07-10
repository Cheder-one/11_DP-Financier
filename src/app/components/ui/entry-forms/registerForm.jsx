import { Formik, Field as FormikField, Form as FormikForm } from "formik";
import { Button, Form, Row, Col } from "react-bootstrap";
import CheckboxField from "../../common/form/checkboxField";
import { registerSchema } from "../../../utils/validators/validationSchema";

const RegisterForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        terms: false
      }}
      validationSchema={registerSchema}
      onSubmit={console.log}
    >
      {({ errors, touched, values, handleChange }) => {
        const getClass = (name) => {
          return `form-control ${
            errors[name] && touched[name] ? "is-invalid" : ""
          }`;
        };

        const getErrorDiv = (name) => {
          return errors[name] && touched[name] ? (
            <div className="invalid-feedback">{errors[name]}</div>
          ) : null;
        };

        return (
          <FormikForm>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <FormikField
                    className={getClass("firstName")}
                    name="firstName"
                  />
                  {getErrorDiv("firstName")}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <FormikField
                    className={getClass("lastName")}
                    name="lastName"
                  />
                  {getErrorDiv("lastName")}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <FormikField className={getClass("email")} name="email" />
              {getErrorDiv("email")}
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <FormikField
                type="password"
                className={getClass("password")}
                name="password"
              />
              {getErrorDiv("password")}
            </Form.Group>

            <CheckboxField
              as={FormikField}
              name="terms"
              value={values.terms}
              onChange={handleChange}
              error={errors.terms}
            >
              Я согласен с{" "}
              <a
                href="https://www.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                условиями
              </a>
            </CheckboxField>

            <Button type="submit" className="w-100">
              Submit
            </Button>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
