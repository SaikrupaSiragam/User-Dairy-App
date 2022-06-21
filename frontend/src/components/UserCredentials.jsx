import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteCredentials, getUserCredentials } from './api';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useFormik } from 'formik';
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { Form, FormGroup, Button, Input, FormText } from 'reactstrap';

const UserCredentialsComponent = () => {
  const regtoken = localStorage.getItem('regtoken')
  const navigate = useNavigate();
  const location = useLocation();
  const userid = location.state.userid;
  const token = regtoken.replaceAll('"', '');
  const [credentials, setCredentials] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    async function getData() {
      console.log(token, userid);
      const userCredentials = await getUserCredentials(token, userid);
      console.log(userCredentials.data);
      setCredentials(userCredentials.data);
    }
    getData();
  }, []);
  const formik = useFormik({
    initialValues: {
      platform: '',
      email: '',
      password: '',
    },
    async onSubmit(values) {
      const { platform, email, password } = values;
      const body = {
        userid: userid,
        platform: platform,
        email: email,
        password: password,
      }
      console.log(body)
      console.log(token)
      console.log(userid, password, platform);
      axios.post(`/usercredentials/${userid}`, body, {
        headers: {
          authorization: token,
        },
      })
        .then((response) => {
          console.log("inside then")
          if (response.data.data) {
            window.location.reload(false);
          }
          else {
            setError(response.data.message)
          }
        })
        .catch((errors) => {
          console.log(`error catch ${errors.response.data.error}`);
          setError(errors.response.data.error);
        })
    },
    validate() {
      const errors = {};
      if (!formik.values.platform) {
        errors.platform = 'Required';
      }
      else if (formik.values.platform.length < 4) {
        errors.platform = "Can't be less than 4 characters";
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

  const columns = [
    {
      name: "Platform",
      selector: (row) => row.platform
    },
    {
      name: "Email",
      selector: (row) => row.email,
    }, {
      name: "Password",
      selector: (row) => row.password,
    },
    {
      name: 'Action',
      selector: (row) =>
        <>
          <BsTrash
            onClick={() => {
              const id = row.id
              const dataUpdate = deleteCredentials(token, id);
              window.location.reload(false)
            }}
          >Delete</BsTrash>
          <BiEdit
            onClick={() => {
              navigate('/editcredentials', { state: { userid: userid, id: row.id, platform: row.platform, email: row.email, password: row.password } });
            }}
          >Edit</BiEdit>
        </>
    }
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: '102px',
        minWidth: "50%",
        textAlign: 'center',
      }
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        backgroundColor: '#95A5A6',
        letterspacing: '0.03em',
      },
    },
    cells: {
      style: {
        fontSize: '17px',
       // backgroundColor: "#a8d59d",
        boxShadow: "0px 0px 9px 0px rgba(0,0,0,0.1)",
        padding: " 10px 0"
      },
    },
  };

  return (
    <div><div>
      <p>{error}</p>
      <button className='credential-logout'
        onClick={() => {
          localStorage.clear()
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
      <DataTable
        columns={columns}
        data={credentials}
        customStyles={customStyles}
      />
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
        className='user-credentials'
      >
        <FormGroup>
          <Input
            type="text"
            name="platform"
            onChange={formik.handleChange}
            value={formik.values.platform}
            placeholder="Enter platform"
            className="login-input"
            invalid={formik.errors.platform && formik.touched.platform}
            required
          />
          {formik.touched.platform && formik.errors.platform && (
            <FormText className='formText-errors'>{formik.errors.platform}</FormText>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Enter email"
            className="login-input"
            invalid={formik.errors.email && formik.touched.email}
            required
          />
          {formik.touched.email && formik.errors.email && (
            <FormText className='formText-errors'>{formik.errors.email}</FormText>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Enter password"
            className="login-input"
            invalid={formik.errors.password && formik.touched.password}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <FormText className='formText-errors'>{formik.errors.password}</FormText>
          )}
        </FormGroup>
        <p className='formText-errors'>{error}</p>
        <FormGroup >
          <Button color="primary" type="submit" className="button-container" >
            Add New Credentials
          </Button>

        </FormGroup>
      </Form>
    </div>
  )
}
export default UserCredentialsComponent;