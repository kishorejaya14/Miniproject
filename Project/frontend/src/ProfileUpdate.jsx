import React from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
function ProfileUpdate() {
  //  const {username}=useParams();
   const [values,SetValues]=useState({
    password:'',
    username:'',
   });
   

  const { username } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial data for the book count update here
    axios
      .post('http://localhost:8082/updatepassword',{ username: username,password: password })
      .then(res => {
        console.log('Fetched data:', res.data);

        SetValues({
          ...values,
          username: res.data.username,
        });
      })
      .catch(err => console.log('error+anu '));
  }, [username]);

  const handleSubmit = event => {
    // const username=useParams();
    // console.log(bookname);
    console.log("username:"+username);
    event.preventDefault();
    const data = {
      username: username,
      password: values.password // Assuming values.count contains the updated count
    };
    axios
      .post('http://localhost:8082/updatepassword',data)
      .then(res => {
        navigate('/profile/:username');
      })
      .catch(err => console.log(err+'anihta'));
  };
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='p-3 rounded w-25 border shadow homepage '>
        <h3>Change Password</h3>
        <form className='homepage' onSubmit={handleSubmit} >
          <div >
            <label>Current Password:</label>
            <input type='password' className='m-lg-1 form-control'/>
          </div>
          <div>
            <label className='ml-3 mt-2'>NEW PASSWORD: </label>
            <input
              type='password'
              name='password'
              id='password'
              value={values.password}
              onChange={e => SetValues({ ...values, password: e.target.value })}
              className='m-lg-1 form-control'
            />
            <button type='submit' className='btn btn-success m-lg-3 m-2 mb-5'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileUpdate
