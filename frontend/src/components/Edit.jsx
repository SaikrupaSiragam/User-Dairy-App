import React from 'react'
import { useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditComponent = () => {
    const location=useLocation();
    console.log(`userid:${location.state.userid}`);
const navigate=useNavigate();
    const [description,setDescription]=useState(location.state.description)
    const [platform,setPlatform]=useState(location.state.platform)
    const [email,setEmail]=useState(location.state.email)
    const [password,setPassword]=useState(location.state.password)
    const date=location.state.date;
    const regtoken = localStorage.getItem('regtoken')
  const token = regtoken.replaceAll('"', '');
    const [error,setError]=useState();
  return (
    <div>
       <button className='logout'
        onClick={() => {
          localStorage.clear()
          navigate("/");
        }}
      >
        Logout
      </button>
      Edit
        <input type='text' value={description} onChange={e=>setDescription(e.target.value)}/>
        <p>{date}</p>
        <button 
         onClick={()=>{
        const id=location.state.id
        const body = {
        id:id,
        date:date,
        description:description,
  }
    console.log(body)
    console.log(token)
      console.log(description);
        axios.put(`/usersdairy/${id}`,body,{
        headers: {
          authorization: token,
        },
      })
        .then((response) => {
          console.log("inside then")
          console.log(response)
          navigate('/userdairy',{
                            state: { userid:location.state.userid}});
        })
        .catch((errors) => {
          console.log(`error catch ${errors.response}`);
          setError(errors.response);
        })
         }}>Update</button>
         <p>{error}</p>
         <input type='text' value={platform} onChange={e=>setPlatform(e.target.value)}/>
        <input type='text' value={email} onChange={e=>setEmail(e.target.value)}/>
       <input type='text' value={password} onChange={e=>setPassword(e.target.value)}/>
        <button 
         onClick={()=>{
        const userid=location.state.userid
        const body = {
       userid:userid,
       platform:platform,
       email:email,
       password:password,
  }
    console.log(body)
    console.log(token)
      console.log(description);
        axios.put(`/usercredentials/${userid}`,body,{
        headers: {
          authorization: token,
        },
      })
        .then((response) => {
          console.log("inside then")
          console.log(response)
          navigate('/userdairy',{
                            state: { userid:location.state.userid}});
        })
        .catch((errors) => {
          console.log(`error catch ${errors.response}`);
          setError(errors.response);
        })
         }}>Update</button>
         <p>{error}</p>
    </div>
  )
}
export default EditComponent;