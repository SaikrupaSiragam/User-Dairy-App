import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCredentials = () => {
  const location = useLocation();
  console.log(`userid:${location.state.userid}`);
  const navigate = useNavigate();
  const [platform, setPlatform] = useState(location.state.platform)
  const [email, setEmail] = useState(location.state.email)
  const [password, setPassword] = useState(location.state.password)
  const regtoken = localStorage.getItem('regtoken')
  const token = regtoken.replaceAll('"', '');
  const [error, setError] = useState();
  return (
    <div className='edit-card'>
      <h5>EditCredentials</h5>
      <div className='card'>
        <input type='text' value={platform} onChange={e => setPlatform(e.target.value)} />
        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
        <input type='text' value={password} onChange={e => setPassword(e.target.value)} />
        <button className='update-button'
          onClick={() => {
            const userid = location.state.userid
            const body = {
              userid: userid,
              platform: platform,
              email: email,
              password: password,
            }
            axios.put(`/usercredentials/${userid}`, body, {
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
                  setError(response.data.debug_data.errors.msg)
                }
              })
              .catch((errors) => {
                console.log(`error catch ${errors.response}`);
                setError(errors.response);
              })
          }}>Update</button>
        <p>{error}</p>
      </div>
    </div>
  )
}

export default EditCredentials;

