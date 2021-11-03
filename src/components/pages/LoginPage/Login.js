import React from "react";
import "./Login.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Formik } from "formik";

const initialValues = { email: "", password: "", rememberMe: true };

const validateForm = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (values.password.length < 8) {
    errors.password = "Need at least 8 characters";
  }
  return errors;
};
const Login = ({ setToken, setUserId }) => {
  const submit = (values, { setSubmitting }) => {
    axios({
      method: "GET",
      url: "https://60dff0ba6b689e001788c858.mockapi.io/token",
      data: values,
    }).then((response) => {
      console.log("values = ", values);
      setSubmitting(false);
      setToken(response.data.token);
      setUserId(response.data.userId);
      axios.defaults.headers.common["Authorization"] = response.data.token;
    });
  };
  return (
    <div className="login-control">
      <Container>
        <h1 className="login-title">Login</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          validate={validateForm}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && errors.email}
                  name="email"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  isInvalid={touched.password && errors.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  checked={values.rememberMe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="rememberMe"
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default Login;
