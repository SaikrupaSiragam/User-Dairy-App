import { useFormik } from 'formik';
import React, { useState } from 'react';
import '../assets/css/login.css'
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
      const { email, password } = values;
      console.log(email, password);
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
          navigate(`/userdairy`, {
            state: { userid: response.data.userDetails.id }
          });
        })
        .catch((errors) => {
          console.log(errors.response.data.error);
          setError(errors.response.data.error);
        });
    },
    validate() {
      const errors = {};
      if (!formik.values.password) {
        errors.password = 'Required';
      }
      else if (formik.values.password.length < 8) {
        errors.password = "password must be > 8 ";
      }
      else if (formik.values.password.length > 16) {
        errors.password = "password must be < 16";
      }
      if (!formik.values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formik.values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
  });

  return (
    <div className="login-container">
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
        className="login-form-container"
      >
        <h3 className="login-heading mb-2">Login</h3>
        <FormGroup>
          <label htmlFor="email">Email</label>
          <Input
            className='login-input'
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter email"
            required
          />
        </FormGroup>
        <p >
          {formik.touched.email && formik.errors.email && (
            <FormText className='formText-errors' >{formik.errors.email}</FormText>
          )}
        </p>
        <FormGroup>
          <label htmlFor="password">Password</label>
          <Input
            className='login-input'
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter password"
            required
          />
        </FormGroup>
        <p>
          {formik.touched.password && formik.errors.password && (
            <FormText className='formText-errors'>{formik.errors.password}</FormText>
          )}
        </p>
        <FormGroup className="text-right">
          <Button color="primary" type="submit" className="button-container" >
            Login
          </Button>
        </FormGroup>
        <div className="text-center">
          <div id="error-status" className="text-center text-danger">
            <p className='formText-errors'>{error}</p>
          </div>
        </div>
        <p>Not an user! <Link to='/signup'><strong>Signup</strong></Link></p>
      </Form>
    </div>
  );
}
