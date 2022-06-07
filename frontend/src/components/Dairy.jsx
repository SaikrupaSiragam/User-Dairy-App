import React, { useEffect, useState } from 'react'
import { deleteEntry, getUserData, getUserDataByDate } from './api';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import "../assets/css/main.css";
import {  useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Button, FormText } from 'reactstrap';
import { BsTrash } from "react-icons/bs";
import {BiEdit} from "react-icons/bi";


const DairyComponent = () => {
  const location=useLocation();
  const navigate=useNavigate();
  const userid=location.state.userid;
  console.log(`useridoflocation:${userid}`);
  const regtoken = localStorage.getItem('regtoken')
  const token = regtoken.replaceAll('"', '');
  const [userdata, setUserData] = useState([]);
  const [startdate, setStartDate] = useState(new Date());
  const [description, setDescription]=useState();
  console.log(description);
   console.log(`startdate: ${startdate}`);
   const [error,setError]=useState();
  useEffect(() => {
    async function getData() {
      const userResponse = await getUserData(token, userid);
      setUserData(userResponse.entry_data);
    }
    getData();
  }, []);
const formik = useFormik({
    initialValues: {
      
    },
    async onSubmit(values){
      console.log(`description ${description}`)
       const body = {
        userid:userid,
        date:startdate,
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
          console.log(response)
          window.location.reload(true);
        })
        .catch((errors) => {
          console.log(`error catch ${errors.response.data.error}`);
          setError(errors.response.data.error);
        })
      },
  });

  const columns = [
    {
      name: "Note",
      selector: (row) => row.description
        },
          {
      name: "Date",
      selector:(row)=>row.date
    },
    {name: 'Action',
      selector:(row)=>
      <>
      <BsTrash
      onClick={()=>{
        const id=row.id
        const dataUpdate= deleteEntry(token,id)
         window.location.reload(true);
      }}
      >Delete</BsTrash>
      
    <BiEdit
      onClick={()=>{
        navigate('/edit', {state: {userid:userid, id: row.id ,date:startdate.toISOString().slice(0,10),description:row.description}});
      }}
      >Edit</BiEdit>
      </>},
     
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: '102px',
        minWidth:"50%", 
      textAlign:'center',   }
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
         textAlign:'center',
        backgroundColor: '#95A5A6',
        letterspacing: '0.03em',
      },
    },
    cells: {
      style: {
        fontSize: '17px',
        backgroundColor: "#a8d59d",
        boxShadow: "0px 0px 9px 0px rgba(0,0,0,0.1)",
        padding:" 10px 0"
      },
    },
  };
 
 async function getNewData(token,e){
   console.log("inside function")
  setStartDate(e.target.value)  
  const newDate=e.target.value;
  const newData= await getUserDataByDate(token,newDate);
  console.log(newData.entry_data);
  setUserData(newData.entry_data);
 }
 
  return (
    <div>
      <input className="date" type='date' value={startdate} onChange={e=>getNewData(token,e)}/>
       <DataTable
        columns={columns}
        data={userdata}
        customStyles={customStyles}
      />
      
       <Form
        onSubmit={formik.handleSubmit}
        // noValidate
        className="dairy-container"
      >
          <FormGroup>
          <input
            type="text-area"
            value={description}
            className="main-text"
            onChange={e=>setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </FormGroup>
        <p>{formik.touched.description && formik.errors.description && (
            <FormText color="danger">{formik.errors.description}</FormText>
          )}</p>
          <FormGroup className="text-right">
          <Button color="primary" type="submit" className="mainbutton-container" >
            Add New Note
          </Button>
        </FormGroup>
        </Form>
      <p>{error}</p>
    </div>
  )
}
export default DairyComponent;