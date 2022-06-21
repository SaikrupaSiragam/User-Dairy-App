import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/edit.css'

const EditComponent = () => {
  const location = useLocation();
  console.log(`userid:${location.state.userid}`);
  const navigate = useNavigate();
  const [description, setDescription] = useState(location.state.description)
  const date = location.state.date;
  console.log(date)
  const regtoken = localStorage.getItem('regtoken')
  const token = regtoken.replaceAll('"', '');
  const [error, setError] = useState();

  return (
    <div className='edit-card'>
      <div className='card'>
        <input type='text' value={description} onChange={e => setDescription(e.target.value)} />
        <p className='formText-errors'>{error}</p>
        <button className='update-button'
          onClick={() => {
            const id = location.state.id
            console.log(date)
            const body = {
              id: id,
              date: date,
              description: description,
            }
            console.log(body)
            console.log(token)
            console.log(description);
            axios.put(`/usersdairy/${id}`, body, {
              headers: {
                authorization: token,
              },
            })
              .then((response) => {
                console.log("inside then")
                console.log(response)
                if (response.data.data) {
                  navigate('/userdairy', { state: { userid: location.state.userid } });
                }
                else {
                  setError('Description length must be > 5')
                }
              })
              .catch((errors) => {
                console.log(`error catch ${errors.response}`);
                setError(errors.response);
              })
          }}>Update</button>
      </div>

    </div>
  )
}
export default EditComponent;