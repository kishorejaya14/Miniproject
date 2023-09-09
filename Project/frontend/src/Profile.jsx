import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode'; // Import jwt-decode library for decoding JWT tokens
import axios from 'axios';
import { Link } from 'react-router-dom';

function Profile() {
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
  console.log("username in profile page:"+username);
  const [user,setUser]=useState({
        username:'',
        email:'',
        address: '',
      })
      useEffect(()=>{
            axios.get('http://localhost:8082/profile/'+username)
            .then(res => setUser(res.data.Result))
            .catch(err=> console.log(err));
          },[username])
  return (
    <div>
       <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
      <div className='d-flex align-items-center flex-column mt-5'>
        <img className='adminimage' src='http://localhost:8082/images/image_1690536399687.jpg'/>
            <h3>UserName: {userData.username}</h3>
             <h3>Email:{user.email}</h3>
             <h3>Address:{user.address}</h3>
         </div>
         <Link to={'/profileupdate/'+user.username} className='btn btn-primary'>Change Password</Link>
          </div>
         
         </div>
  );
}

export default Profile;