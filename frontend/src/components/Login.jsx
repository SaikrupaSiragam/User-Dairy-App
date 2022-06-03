import {  useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Button, Input, FormText } from 'reactstrap';
import axios from 'axios';

export default function LoginComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit(values) {
      const {email,password}=values;
      console.log(email,password);
      await axios
        .post('/users/login', {
          email: email,
          password: password,
        }).then((response) => {
          localStorage.setItem('regtoken', JSON.stringify(response.data.token));
          localStorage.setItem(
            'regtoken user',
            JSON.stringify(response.data.userDetails)
          );
          navigate(`/users/${JSON.stringify(response.data.userDetails.id)}`);
        })
        .catch((errors) => {
          console.log(errors.response.data.error);
          setError(errors.response.data.error);
        });
    },
    validate() {
      const errors = {};
      if (formik.values.password.length < 6) {
        errors.password = "Can't be less than 6 characters";
      }
      if (formik.values.email.length < 3) {
        errors.email = "Can't be less than 3 characters";
      }
      return errors;
    },
  });
  return (
    <div className="login-container text-center d-flex flex-column justify-content-center align-items-center">
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
        className="login-form-container"
      >
        <h3 className="login-heading mb-2">Login</h3>
        <FormGroup>
          <Input
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter email"
            className="mb-2"
            invalid={formik.errors.email && formik.touched.email}
            required
          />
          {formik.touched.email && formik.errors.email && (
            <FormText color="danger">{formik.errors.email}</FormText>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter password"
            className="mb-2"
            invalid={formik.errors.password && formik.touched.password}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <FormText color="danger">{formik.errors.password}</FormText>
          )}
        </FormGroup>
        <FormGroup className="text-right">
          <Button color="primary" type="submit" className="w-50 mb-2" >
            Login
          </Button>
        </FormGroup>
        <div className="text-center">
          <div id="error-status" className="text-center text-danger">
            <p>{error}</p>
          </div>
        </div>
        <p>Not an user <Link to='/signup'><button>Signup</button></Link></p>
      </Form>
    </div>
  );
}
