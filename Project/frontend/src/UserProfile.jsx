import React, { useEffect } from 'react'
import  { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function UserProfile() {
  const {username}=useParams();
  const navigate=useNavigate();
  const [user,setUser]=useState({
    username:''
  })
  useEffect(()=>{
    axios.get('http://localhost:8082/userdashboard/userprofile/'+username)
    .then(res => setUser(res.data.Result[0]))
    .catch(err=> console.log(err));
  },[])
  const handleLogout =()=>{
    axios.get('http://localhost:8082/logout')
    .then(res =>{
        navigate('/start')
    }).catch(err => console.log(err));
  }
  return (
    <div>
    <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
      <img src={'http://localhost:8082/images/'+user.image} alt=" " className='userImg'/>
      <div className='d-flex align-items-center flex-column mt-5'>
        <h3>UserName: {user.username}</h3>
        <h3>Email:{user.email}</h3>
        <h3>Address:{user.address}</h3>
      </div>
      <div>
        <button className='btn btn-primary me-2'>Edit</button>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
      </div>
     </div>
     
    </div>
  )
}

export default UserProfile
