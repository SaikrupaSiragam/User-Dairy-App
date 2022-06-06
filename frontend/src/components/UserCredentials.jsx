import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { deleteCredentials, deleteEntry, getUserCredentials, getUserData } from './api';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import {  useFormik } from 'formik';
import { Form, FormGroup, Button, Input, FormText } from 'reactstrap';
import EdiText from 'react-editext';


const UserCredentialsComponent = () => {
  const regtoken = localStorage.getItem('regtoken')
  const location=useLocation();
  const  userid  = location.state.userid;
  const token = regtoken.replaceAll('"', '');
  const [credentials, setCredentials] = useState();
     const [error,setError]=useState();
  useEffect(() => {
    async function getData() {
      console.log(token,userid);
      const userCredentials = await getUserCredentials(token,userid);
      console.log(userCredentials.data);
       setCredentials(userCredentials.data);
    }
    getData();
  }, []);
 // console.log(userdata);
const formik = useFormik({
    initialValues: {
      platform:'',
      email:'',
      password:'',
    },
    async onSubmit(values){
      const {platform,email,password}=values;
       const body = {
        userid:userid,
        platform:platform,
        email:email,
        password:password,
  }
    console.log(body)
    console.log(token)
      console.log(userid,password);
        axios.post(`/usercredentials/${userid}`,body,{
        headers: {
          authorization: token,
        },
      })
        .then((response) => {
          console.log("inside then")
          window.location.reload(true);
        })
        .catch((errors) => {
          console.log(`error catch ${errors.response.data.error}`);
          setError(errors.response.data.error);
        })
      },
  });
//  const  handleChange = (val) => {
//     const {uid,userid,password}=val;
//        const body = {
//         userid:userid,
//         password:password,
//   }
//     console.log(body)
//     console.log(token)
//       console.log(userid,password);
//         axios.put(`/usersdairy/${uid}`,body,{
//         headers: {
//           authorization: token,
//         },
//       })
//         .then((response) => {
//           console.log("inside then")
//           window.location.reload(true);
//         })
//         .catch((errors) => {
//           console.log(`error catch ${errors.response.data.error}`);
//           setError(errors.response.data.error);
//         })
//          console.log('Edited Value -> ', val)
//       };
   
  const columns = [
    {
      name: "Platform",
      selector: (row) => 
      <EdiText type='text' value={row.platform} saveButtonContent="Apply" ></EdiText>
        },
    {
      name: "Email",
      selector: (row) => row.email,
    }, {
      name: "Password",
      selector: (row) => row.password,
    },
    {name: 'Action',
      selector:(row)=>
      <button
      onClick={()=>{
        const id=row.id
        const dataUpdate= deleteCredentials(token,id);
         window.location.reload(true);
      }}
      >Delete</button>}
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: '62px',
      }
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
    },
    cells: {
      style: {
        fontSize: '17px',
      },
    },
  };
  return (
    <div>Dairy
       <DataTable
        columns={columns}
        data={credentials}
        customStyles={customStyles}
      />
       <Form
        onSubmit={formik.handleSubmit}
        // noValidate
        className="login-form-container"
      >
          <FormGroup>
          <Input
            type="text"
            name="platform"
            onChange={formik.handleChange}
            value={formik.values.platform}
            placeholder="Enter platform"
            className="mb-2"
            invalid={formik.errors.platform && formik.touched.platform}
            required
          />
          {formik.touched.platform && formik.errors.platform && (
            <FormText color="danger">{formik.errors.platform}</FormText>
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
            type="text"
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
            Add New Note
          </Button>
        </FormGroup>
        </Form>
       
      <p>{error}</p>
    </div>
  )
}
export default UserCredentialsComponent;