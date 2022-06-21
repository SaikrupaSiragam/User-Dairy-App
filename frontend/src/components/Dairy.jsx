import React, { useEffect, useState } from 'react'
import { deleteEntry, getImages, getUserData, getUserDataByDate } from './api';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import axios from 'axios';
import "../assets/css/main.css";
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Button, FormText } from 'reactstrap';
import { BsTrash, BsUpload } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { Icon } from 'semantic-ui-react'

const DairyComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userid = location.state.userid;
  console.log(`useridoflocation:${userid}`);
  const regtoken = localStorage.getItem('regtoken')
  const token = regtoken.replaceAll('"', '');
  const [userdata, setUserData] = useState([]);
  const [usersdairy_id, setUsersdairyId] = useState();
  const [dairyid, setDairyId] = useState();
  const [startdate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  console.log(`startdate: ${startdate}`);
  const [error, setError] = useState();
  useEffect(() => {
    async function getData() {
      const userResponse = await getUserData(token, userid);
      setUserData(userResponse.entry_data);

    }
    getData();
  }, []);
  async function handleChange(token, id) {
    console.log(id)
    const imagesUploaded = await getImages(token, id)
    setUsersdairyId(imagesUploaded.data)
    console.log(imagesUploaded.data)
  }
  const columns = [
    {
      name: "Note",
      selector: (row) => row.description
    },
    {
      name: "Date",
      selector: (row) => row.date,

    },
    {
      name: "Images",
      selector: (row) =>
        <button
          onClick={() => {
            navigate('/imagesUploaded', { state: { id: row.id, token: token, userid: userid, description: row.description } })
          }}
        >Display Images</button>
    },
    {
      name: 'Action',
      selector: (row) =>
        <>

          <BsUpload
            onClick={() => {
              navigate('/upload', { state: { usersdairy_id: row.id, userid: userid } })
            }}
          >Upload</BsUpload>
          <BiEdit
            onClick={() => {
              navigate('/edit', { state: { userid: userid, id: row.id, date: row.date, description: row.description } });
            }}
          >Edit</BiEdit>
          <BsTrash
            onClick={() => {
              const id = row.id
              const dataUpdate = deleteEntry(token, id)
              window.location.reload(false);
            }}
          >Delete</BsTrash>
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
        padding: " 40px ",
      },
    },
  };
  const formik = useFormik({
    initialValues: {

    },
    async onSubmit(values) {
      console.log(`description ${description}`)
      const data = {
        userid: userid,
        date: startdate,
        description: description
      }

      console.log(token)
      console.log(userid, description);
      axios.post(`/usersdairy/${userid}`, data, {
        headers: {
          authorization: token,
        },
      })
        .then((response) => {
          console.log("inside then")
          console.log(response.data.data)
          if (response.data.data) {
            window.location.reload(false);
          }
          else if (response.data.debug_data) {
            alert('description length must be > 5')
          }
          else {
            alert('please choose image type of jpg/jpeg/png/gif')
          }
        })
        .catch((errors) => {
          console.log(`error catch ${errors}`);
          setError("AxiosError: Request failed with status code 500")
        })
    },
  });

  async function getNewData(token, userid, e) {
    console.log("inside function")
    setStartDate(e.target.value)
    const newDate = e.target.value;
    const newData = await getUserDataByDate(token, userid, newDate);
    console.log(newData.entry_data);
    setUserData(newData.entry_data);
  }


  return (
    <div className='edi'>
      <div className='dairy'>
        <Form
          onSubmit={formik.handleSubmit}

          className="dairy-container">
          <FormGroup>
            <input
              type="text-area"
              value={description}
              className="text-area"
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter description"
              required />
            <Button color="primary" type="submit" className="mainbutton-container" >
              Add New Note
            </Button>
          </FormGroup>
          <p>{formik.touched.description && formik.errors.description && (
            <FormText className='formText-errors'>{formik.errors.description}</FormText>
          )}</p>
        </Form>
        <p>{error}</p>
        <input className="date" type='date' value={startdate} onChange={e => getNewData(token, userid, e)} />
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