import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

function UserDashboad() {
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
useEffect(()=>{
    axios.get('http://localhost:8082/userdashboard')
    .then( res => {
      console.log("Response Status:", res.status);
      console.log("Response Data:", res.data);
      if(res.data.Status ==="Success"){
          const username=res.data.username;
          navigate('/userdashboard/userhome')
      }else{
          navigate('/start')
      }
    })
    .catch( err =>{
      console.log(err);
    } );
},[]);
const handleLogout =()=>{
  axios.get('http://localhost:8082/logout')
  .then(res =>{
      navigate('/start')
  }).catch(err => console.log(err));
}
  return (
    <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/userdashboard" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline"><strong>User Menu</strong></span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <Link to='/userdashboard/userhome' class="nav-link align-middle px-0 text-white">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">UserHome</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/userdashboard/takebook' data-bs-toggle="collapse" class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-book"></i> <span class="ms-1 d-none d-sm-inline">Take Books</span> </Link>
                        <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                        </ul>
                    </li>
                    <li>
                        <Link to= '/userdashboard/returnbook' class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-book"></i> <span class="ms-1 d-none d-sm-inline">Return Books</span> </Link>
                    </li>
                    <li>
                        <Link to='/userdashboard/userdetail/:username' class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-person"></i> <span class="ms-1 d-none d-sm-inline">Profile</span></Link>
                    </li>
                    <li onClick={handleLogout}>
                        <Link to='/logout' class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-power"></i> <span class="ms-1 d-none d-sm-inline ">Log out</span></Link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col p-0 m-0">
            <div className='p-2 d-flex justify-content-center shadow'>
                <h4>Library Management System</h4>
            </div>
            <Outlet/>
        </div>
    </div>
</div>
  )
}

export default UserDashboad
