import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const[data,setData]=useState({
        email:'',
        username:'',
        password:'',
        address:' ',
        image: ' ',
    })
  const navigate=useNavigate();
   const handleSubmit=(event)=> {
    event.preventDefault();
    const formdata=new FormData();
    formdata.append("email",data.email);
    formdata.append("username",data.username);
    formdata.append("password",data.password);
    formdata.append("address",data.address);
    formdata.append("image",data.image);
    axios.post('http://localhost:8082/create',formdata)
    .then(res => {
      navigate('/start');
    })
    .catch(err => console.log(err));
   }
  return (
    <div className='homepage'>
    <div className='text-center ms-5 justify-content-center'>
        <h2>Registration Form</h2>
        </div>
   <div className='d-flex align-content-center pt-4'>
      <form className=' row g-4 w-50 justify-content-center border shadow m-auto addbooks' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor='inputEmail4' className='form-label'>Email</label>
          <input type='email' className='form-control' placeholder='Enter Email'name='email' id="emailid" autoComplete='off'
          onChange={e => setData({...data,email:e.target.value})}/>
          </div>
       
        <div className='col-12'>
          <label htmlFor='inputuser4' className='form-label'>Username</label>
          <input type='text' className='form-control' placeholder='choose Username' name='username' id="username" autoComplete='off'
          onChange={e => setData({...data,username:e.target.value})}/>
        </div>
        <div className='col-12'>
          <label htmlFor='inputpassword4' className='form-label'>Password</label>
          <input type='password' className='form-control' placeholder='choose Password'name='password' id="password"
          onChange={e => setData({...data,password:e.target.value})}/>
        </div>
        <div className='col-12'>
          <label htmlFor='inputAddress' className='form-label'>Address</label>
          <input type='text' className='form-control' placeholder='Enter Address' name='address' id="address" autoComplete='off'
          onChange={e => setData({...data,address:e.target.value})}/>
        </div>
        <div className='col-12 mb-3'>
          <label htmlFor='inputGroupFile01' className='form-label'>Select Image</label>
          <input type='file' className='form-control' name='image'  id="image"
          onChange={e => setData({...data,image :e.target.files[0]})}/>
        </div>
        <button type='submit' className='btn btn-success w-50 rounded-0'>Create</button>
      </form>
    </div>
    </div>
  )
}

export default Register
