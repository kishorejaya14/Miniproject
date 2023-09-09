import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

function TakeBook() {
  const [data,setData]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:8082/getbooks')
    .then(res=>setData(res.data.Result))
    .catch(err=>console.log(err));
  },[])
  return (
    <div >
        <div className='mt-4 px-5 pt-3'>
    <h3>List of Books</h3>
    <table className='table homepage text-dark'>
      <thead>
        <th>Book id</th>
      <th>Name of the Book</th>
      <th>Author</th>
      <th>Count</th>
      <th>Action</th>
      </thead>
      <tbody>
       {data.map((books,index)=>{
        return <tr key={index}>
          <td>{books.id}</td>
          <td>{books.name}</td>
          <td>{books.author}</td>
          <td>{books.count}</td>
          <td>
                <Link to={'/userdashboard/borrow/'+books.name} className='btn btn-primary'>Take</Link>
              </td>
        </tr>
        })} 
      </tbody>
     
    </table>
   </div>
    </div>
  )
}

export default TakeBook
