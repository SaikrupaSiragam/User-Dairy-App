import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { deleteEntry, getUserData } from './api';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import {  useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import { Form, FormGroup, Button, Input, FormText } from 'reactstrap';
import EdiText from 'react-editext';


const DairyComponent = () => {
  // console.log(moment(new Date()));
  const location=useLocation();
  const userid=location.state.userid;
  console.log(`useridoflocation:${userid}`);
  const regtoken = localStorage.getItem('regtoken')
  // const userdetails=localStorage.getItem('regtoken user');
  // console.log(userdetails);
  const token = regtoken.replaceAll('"', '');
  const [userdata, setUserData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate.toISOString().slice(0,10));
  const [note, setNote]=useState([]);
  // console.log(userid);
   const [error,setError]=useState();
  useEffect(() => {
    async function getData() {
      const userResponse = await getUserData(token, userid);
      // console.log(token);
     // console.log(userResponse.entry_data);
      setUserData(userResponse.entry_data);
    }
    getData();
  }, []);
 // console.log(userdata);
const formik = useFormik({
    initialValues: {
      description:'',
    },
    async onSubmit(values){
      const {description}=values;
       const body = {
        userid:userid,
        description:description,
  }
    console.log(body)
    console.log(token)
      console.log(userid,description);
        axios.post(`/usersdairy/${userid}`,body,{
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
//     const {uid,userid,description}=val;
//        const body = {
//         userid:userid,
//         description:description,
//   }
//     console.log(body)
//     console.log(token)
//       console.log(userid,description);
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
      name: "Note",
      selector: (row) => 
      <EdiText type='text' value={row.description} saveButtonContent="Apply" ></EdiText>
        },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {name: 'Action',
      selector:(row)=>
      <button
      onClick={()=>{
        const id=row.id
        const dataUpdate= deleteEntry(token,id)
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
    <div>
       <DataTable
        columns={columns}
        data={userdata}
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
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            placeholder="Enter description"
            className="mb-2"
            invalid={formik.errors.description && formik.touched.description}
            required
          />
          {formik.touched.description && formik.errors.description && (
            <FormText color="danger">{formik.errors.description}</FormText>
          )}
        </FormGroup>
        
        <FormGroup className="text-right">
          <Button color="primary" type="submit" className="w-50 mb-2" >
            Add New Note
          </Button>
        </FormGroup>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </Form>
      <p>{error}</p>
    </div>
  )
}
export default DairyComponent;