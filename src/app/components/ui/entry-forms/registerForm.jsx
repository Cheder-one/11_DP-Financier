import { Formik, Field as FormikField, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms and conditions")
});

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
      validationSchema={RegisterSchema}
      onSubmit={console.log}
    >
      {({ errors, touched }) => {
        const getClass = (name) => {
          return `form-control ${
            errors[name] && touched[name] ? "is-invalid" : ""
          }`;
        };

        const getErrorDiv = (name, isCheckbox = false) => {
          const getClass = () => (isCheckbox ? "" : "invalid-feedback");

          return errors[name] && touched[name] ? (
            <div className={getClass()}>{errors[name]}</div>
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

            <Form.Group controlId="terms" className="my-3">
              <InputGroup hasValidation>
                <FormikField
                  id="terms"
                  type="checkbox"
                  name="terms"
                  as={Form.Check.Input}
                />
                <label htmlFor="terms" className="ps-2">
                  Согласен с условиями
                </label>
              </InputGroup>
              {getErrorDiv("terms", true)}
            </Form.Group>

            {/* <div className="form-check p-0 my-3">
              <label className="form-check-label">
                <FormikField type="checkbox" name="terms" />
                <span className="p-1">Согласен с условиями</span>
              </label>
              {getErrorDiv("terms")}
            </div> */}

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
