import {  useFormik } from 'formik';
import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Button, Input,FormText } from 'reactstrap';
import axios from 'axios';

export default function SingUpComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
        name:'',
        age: '',
      email: '',
      password: '',
    },
    async onSubmit(values) {
      const {name,age,email,password}=values;
      console.log(name,age,email,password);
      await axios
        .post('/users/signup', {
          name:name,
          ahe:age,
          email: email,
          password: password,
        }).then((response) => {
          // setError(response.debug_data.errors);
          console.log(response.debug_data.errors);
        //  navigate('/login');
        })
        .catch((errors) => {
          console.log(errors.response.data.error);
          setError(errors.response.data.error);
        });
    },
    validate() {
      const errors = {};
      if (formik.values.name.length < 4) {
        errors.name = "Can't be less than 4 characters";
      }
      if (formik.values.age.length < 0) {
        errors.age = "Can't be less than 0 characters";
      }
      if (formik.values.password.length < 6 ) {
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
        <h3 className="login-heading mb-2">SignUp</h3>
        <FormGroup>
          <Input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Enter name"
            className="mb-2"
            invalid={formik.errors.name && formik.touched.name}
            required
          />
          {formik.touched.name && formik.errors.name&& (
            <FormText color="danger">{formik.errors.name}</FormText>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
            placeholder="Enter age"
            className="mb-2"
            invalid={formik.errors.age && formik.touched.age}
            required
          />
          {formik.touched.age && formik.errors.age && (
            <FormText color="danger">{formik.errors.age}</FormText>
          )}
        </FormGroup>
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
          <Button color="primary" type="submit" className="w-50 mb-2">
           SignUp
          </Button>
        </FormGroup>
        <div className="text-center">
          <div id="error-status" className="text-center text-danger">
            <p>{error}</p>
          </div>
        </div>
        <p>Already an user ! <Link to='/login'><button>Login</button></Link></p>
      </Form>
    </div>
  );
}
