import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Home() {
  const [adminCount,setAdminCount]=useState();
  const [userCount,setUserCount]=useState();
  const [booksCount,setBookCount]=useState();
  const [data,setData]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:8082/getbooks')
    .then(res=>setData(res.data.Result))
    .catch(err=>console.log(err));
  },[])
 
  useEffect(()=>{
   
    axios.get('http://localhost:8082/adminCount')
   .then(res => {
      console.log(res);
      setAdminCount(res.data[0].admin);
   }).catch(err => console.log(err));
  
    axios.get('http://localhost:8082/userCount')
   .then(res =>{
      // console.log(res);
      setUserCount(res.data[0].user);
   }).catch(err => console.log(err));
   
    axios.get('http://localhost:8082/bookCount')
   .then(res =>{
      // console.log(res);
      setBookCount(res.data[0].books);
   }).catch(err => console.log(err));
  },[]);
  return (
    <div>
    <div className='p-3 d-flex justify-content-around '>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25 homepage'>
        <div className='text-center pb-1'>
        <p>Admin</p>
        </div>
        <hr/>
        <div className='text-center pb-1'>
        <p><strong>Total:{ adminCount }</strong></p>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25 homepage'> 
      <div className='text-center pb-1'>
      <p>User</p>
      </div>
        <hr/>
        <div className=''>
        <p><strong>Total:{ userCount}</strong></p>
        </div>
      </div>
      <div className='px=3 pt-2 pb-3 border shadow-sm w-25 homepage'>
        <div className='text-center pb-1'>
            <p>Books</p>
            </div>
        <hr/>
        <div className='text-center pb-1'>
        <p><strong>Total:{booksCount}</strong></p>
        </div>
      </div>
       

    </div>
    <div className='mt-4 px-5 pt-3'>
    <h3 className='text-center'>List of Books</h3>
    <table className='table homepage'>
      <thead>
        <th>Id</th>
      <th>Name of the Book</th>
      <th>Author</th>
      <th>Count</th>
      <th>Update Count</th>
      </thead>
      <tbody className='homepage'>
       {data.map((books,index)=>{
        return <tr key={index}>
          <td>{books.id}</td>
          <td>{books.name}</td>
          <td>{books.author}</td>
          <td>{books.count}</td>
          <th><Link to={'/updatecount/'+books.name} className='btn btn-outline-secondary update'>Update</Link></th>
        </tr>
        })} 
      </tbody>
     
    </table>
   </div>
   </div>
  )
}

export default Home
