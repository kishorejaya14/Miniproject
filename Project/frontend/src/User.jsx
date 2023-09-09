import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function User() {
  const [data,setData]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:8082/getuser')
    .then(res => {
      if(res.data.Status === "Success"){
        console.log(res.data.Result)
        setData(res.data.Result);
      }
      else{
        alert("Error");
      }
    })
    .catch(err => console.log(err));
  },[])
  return (
    <div className='px-5 py-3 userlist'>
      <Link to='/create' className='btn btn-success mt-3'>Add users</Link>
      <div className='d-flex justify-content-center mt-2 userlist'>
        <h3>User List</h3>
      </div>
      <table className='table homepage userlist'>
        <thead className='homepage'>
          <tr>
            <th>Email</th>
            <th>UserName</th>
            <th>Profile Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user,index)=>{
            return <tr key={index}>
              <td >{user.email}</td>
              <td>{user.username}</td>
              <td>{
              <img src={'http://localhost:8082/images/'+user.image} alt="" className='user-img'></img>
              }</td>
             <td>
                <Link to={'/useredit/'+user.username} className='btn btn-primary'>View History</Link>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default User
