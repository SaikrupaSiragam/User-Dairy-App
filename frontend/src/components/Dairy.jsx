import React, { useEffect, useState } from 'react'
import { deleteEntry, getUserData, getUserDataByDate } from './api';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import "../assets/css/main.css";
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Button, FormText } from 'reactstrap';
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

const DairyComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userid = location.state.userid;
  console.log(`useridoflocation:${userid}`);
  const regtoken = localStorage.getItem('regtoken')
  const token = regtoken.replaceAll('"', '');
  const [userdata, setUserData] = useState([]);
  const [startdate, setStartDate] = useState(new Date().toISOString().slice(0,10));
  const [description, setDescription] = useState();
   const [image, setImage]=useState();
  console.log(`startdate: ${startdate}`);
  const [error, setError] = useState();
  useEffect(() => {
    async function getData() {
      const userResponse = await getUserData(token, userid);
      setUserData(userResponse.entry_data);
      console.log(userResponse.entry_data)
    }
    getData();
  }, []);

  const columns = [
    {
      name: "Note",
      selector: (row) => row.description
    },
    {
      name: "Date",
      selector: (row) => row.date
    },
    {
      name: 'Image',
      selector:(row)=>row.image
    },
    {
      name: 'Action',
      selector: (row) =>
        <>
          <BsTrash
            onClick={() => {
              const id = row.id
              const dataUpdate = deleteEntry(token, id)
              window.location.reload(true);
            }}
          >Delete</BsTrash>

          <BiEdit
            onClick={() => {
              navigate('/edit', { state: { userid: userid, id: row.id, date: row.date, description: row.description } });
            }}
          >Edit</BiEdit>
        </>
    },

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
        backgroundColor: '#95A5A6',
        letterspacing: '0.03em',
      },
    },
    cells: {
      style: {
        fontSize: '17px',
        backgroundColor: "",
        boxShadow: "0px 0px 9px 0px rgba(0,0,0,0.1)",
        padding: " 10px 0"
      },
    },
  };
  const formik = useFormik({
    initialValues: {

    },
    async onSubmit(values) {
      console.log(`description ${description}`)
      const formdata=new FormData()
      formdata.append('image', image)
      formdata.append('userid',userid)
      formdata.append('date',startdate)
      formdata.append('description',description)
      
      console.log(token)
      console.log(userid, description);
      axios.post(`/usersdairy/${userid}`, formdata, {
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

  async function getNewData(token,userid, e) {
    console.log("inside function")
    setStartDate(e.target.value)
    const newDate = e.target.value;
    const newData = await getUserDataByDate(token,userid, newDate);
    console.log(newData.entry_data);
    setUserData(newData.entry_data);
  }


  return (
    <div className='edi'>
      <div className='dairy'>
        <Form
          onSubmit={formik.handleSubmit}
          encType='multipart/form-data'
          method='POST'
          className="dairy-container">
          <FormGroup>
            <input
              type="text-area"
              value={description}
              className="main-text"
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter description"
              required />
              <input type='file' name='image' onChange={(e)=>setImage(e.target.files[0])} required/>
            <Button color="primary" type="submit" className="mainbutton-container" >
              Add New Note
            </Button>
          </FormGroup>
          <p>{formik.touched.description && formik.errors.description && (
            <FormText className='formText-errors'>{formik.errors.description}</FormText>
          )}</p>
        </Form>
        <p>{error}</p>
        <input className="date" type='date' value={startdate} onChange={e => getNewData(token,userid, e)} />
        <button className='logout'
          onClick={() => {
            localStorage.clear()
            navigate("/");
          }}>
          Logout
        </button>
      </div>
      <DataTable
        columns={columns}
        data={userdata}
        customStyles={customStyles} />
    </div>
  )
}
export default DairyComponent;