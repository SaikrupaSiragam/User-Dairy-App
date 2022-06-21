import { useFormik } from 'formik';
import React, { useState } from 'react';
import '../assets/css/signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Button, Input, FormText } from 'reactstrap';
import axios from 'axios';

export default function SingUpComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      email: '',
      password: '',
    },
    async onSubmit(values) {
      const { name, age, email, password } = values;
      console.log(name, age, email, password);
      await axios
        .post('/users/signup', {
          name: name,
          ahe: age,
          email: email,
          password: password,
        }).then((response) => {
          if (response.data.data) {
            navigate('/');
          }
          else {
            console.log(response.data.error);
            setError(response.data.error)
          }
        })
        .catch((errors) => {
          console.log(errors.response.data.error);
          setError(errors.response.data.error);
        });
    },
    validate() {
      const errors = {};
      if (!formik.values.name) {
        errors.name = 'Required';
      }
      else if (formik.values.name.length < 4) {
        errors.name = "Can't be less than 4 characters";
      }
      if (!formik.values.age) {
        errors.age = 'Required';
      }
      else if (formik.values.age.length < 0) {
        errors.age = "Can't be less than 0 characters";
      }
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
    <div className="login-container ">
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
        className="signup-form-container"
      >
        <h3 >SignUp</h3>
        <FormGroup>
          <Input
            className='signup-container'
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Enter name"
            required
          /></FormGroup>
        <p>
          {formik.touched.name && formik.errors.name && (
            <FormText className='formText-errors'>{formik.errors.name}</FormText>
          )}
        </p>
        <FormGroup>
          <Input
            className='signup-container'
            type="number"
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
            placeholder="Enter age"
            required
          /></FormGroup>
        <p>
          {formik.touched.age && formik.errors.age && (
            <FormText className='formText-errors'>{formik.errors.age}</FormText>
          )}
        </p>
        <FormGroup>
          <Input
            className='signup-container'
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter email"
            required
          /></FormGroup>
        <p>
          {formik.touched.email && formik.errors.email && (
            <FormText className='formText-errors'>{formik.errors.email}</FormText>
          )}
        </p>
        <FormGroup>
          <Input
            className='signup-container'
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter password"
            required
          />
        </FormGroup>
        <p>{formik.touched.password && formik.errors.password && (
          <FormText className='formText-errors'>{formik.errors.password}</FormText>
        )}</p>
        <FormGroup className="text-right">
          <Button color="primary" type="submit" className="button-container">
            SignUp
          </Button>
        </FormGroup>
        <div className="text-center">
          <div id="error-status" className="text-center text-danger">
            <p className='formText-errors'>{error}</p>
          </div>
        </div>
        <p>Already an user ! <Link to='/'><strong>Login</strong></Link></p>
      </Form>
    </div>
  );
}
