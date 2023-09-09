import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DeleteBooks() {

    const [data, setData] = useState({
        name: '',
        author: '',
        id: '',
      });
    
      const navigate = useNavigate();
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('name', data.name);
        formdata.append('author', data.author);
        formdata.append('id', data.id);
    
        axios
          .get('http://localhost:8082/leavebooks', formdata)
          .then((res) => {
            navigate('/');
          })
          .catch((err) => console.log(err+"anusha"));
      };
    
      return (
        <div className='homepage'>
          <div className='text-center ms-5 justify-content-center '>
            <h2>Add Books</h2>
          </div>
          <div className='d-flex align-content-center pt-4'>
            <form
              className='row g-4 w-50 justify-content-center border shadow m-auto addbooks'
              onSubmit={handleSubmit}
            >
              <div className='col-12'>
          <label htmlFor='inputEmail4' className='form-label'>Name of the book</label>
          <input type='text' className='form-control' placeholder='Enter Name of the Book'name='name' id="name" autoComplete='off'
          onChange={e => setData({...data,name:e.target.value})}/>
          </div>
       
        <div className='col-12'>
          <label htmlFor='inputuser4' className='form-label'>Author Name</label>
          <input type='text' className='form-control' placeholder='Enter Author Name' name='author' id="author" autoComplete='off'
          onChange={e => setData({...data,author:e.target.value})}/>
        </div>
        <div className='col-12'>
          <label htmlFor='inputAddress' className='form-label'>ID</label>
          <input type='text' className='form-control' placeholder='Enter ID (should be unique)' name='id' id="id" autoComplete='off'
          onChange={e => setData({...data,id:e.target.value})}/>
        </div>
     
        <button type='submit' className='btn btn-danger w-50 rounded-0'>Delete</button>
      
            </form>
          </div>
        </div>
  )
}

export default DeleteBooks
