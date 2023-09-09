// import React, { useEffect } from 'react'
// import  { useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import axios from 'axios'
// import { Outlet,Link } from 'react-router-dom'
// function UserDetail() {
//   const {username}=useParams();
//   if( axios.defaults.withCredentials){
//   // const token=localStorage.setItem('token',token);
//   const c=a
//   console.log("token is"+token);
//   }
//   const navigate=useNavigate();
//   const [user,setUser]=useState({
//     username:'',
//     email:'',
//     address: '',
//     image:'',
//   })
//   useEffect(()=>{
//     axios.get('http://localhost:8082/userdashboard/userdetail/'+username)
//     .then(res => setUser(res.data.Result[0]))
//     .catch(err=> console.log(err));
//   },[])
//   const handleLogout =()=>{
//     axios.get('http://localhost:8082/logout')
//     .then(res =>{
//         navigate('/start')
//     }).catch(err => console.log(err));
//   }
//   return (
//     <div>
//     <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
//       <img src={'http://localhost:8082/images/'+user.image} alt=" " className='userImg'/>
//       <div className='d-flex align-items-center flex-column mt-5'>
//         <h3>UserName: {user.username}</h3>
//         <h3>Email:{user.email}</h3>
//         <h3>Address:{user.address}</h3>
//       </div>
//       <div>
//         <button className='btn btn-primary me-2'>Edit</button>
//         <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
//       </div>
//      </div>
     
//     </div>
//   )
  
  
// }

// export default UserDetail

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode'; // Import jwt-decode library for decoding JWT tokens
import axios from 'axios';

function UserDetail() {
  const [userData, setUserData] = useState({
    username:''
  });
  const token = Cookies.get('token'); // Replace 'authToken' with your cookie name

  useEffect(() => {
    if (token) {
      try {
        // Decode the JWT token to extract user information
        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;
        // You can also extract other user details as needed
        setUserData({ username });
       
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token]);
  const username=userData.username
  const [user,setUser]=useState({
        username:'',
        email:'',
        address: '',
        image:'',
      })
      useEffect(()=>{
            axios.get('http://localhost:8082/userdashboard/userdetail/'+username)
            .then(res => setUser(res.data.Result))
            .catch(err=> console.log(err));
          },[username])
  return (
    <div>
       <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
          <img src={'http://localhost:8082/images/'+user.image} alt=" " className='userImg'/>
      <div className='d-flex align-items-center flex-column mt-5'>
            <h3>UserName: {userData.username}</h3>
             <h3>Email: {user.email}</h3>
             <h3>Address: {user.address}</h3>
         </div>
           <div>
             {/* <button className='btn btn-primary me-2'>Edit</button> */}
             {/* <button className='btn btn-danger' onClick={handleLogout}>Logout</button> */}
           </div>
          </div>
         
         </div>
  );
}

export default UserDetail;
