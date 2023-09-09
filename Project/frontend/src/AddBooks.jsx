import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBooks() {
  const [data, setData] = useState({
    name: '',
    author: '',
    count: '',
    id: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append('name', data.name);
    formdata.append('author', data.author);
    formdata.append('count', data.count);
    formdata.append('id', data.id);

    axios
      .post('http://localhost:8082/addbooks', formdata)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => console.log(err));
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
      <label htmlFor='inputpassword4' className='form-label'>Count</label>
      <input type='number' className='form-control' placeholder='Count of Book'name='count' id="count"
      onChange={e => setData({...data,count:e.target.value})}/>
    </div>
    <div className='col-12'>
      <label htmlFor='inputAddress' className='form-label'>ID</label>
      <input type='text' className='form-control' placeholder='Enter ID (should be unique)' name='id' id="id" autoComplete='off'
      onChange={e => setData({...data,id:e.target.value})}/>
    </div>
    {/* <div className='col-12 mb-3'>
      <label htmlFor='inputGroupFile01' className='form-label'>Select Image</label>
      <input type='file' className='form-control' name='image'  id="imputGroup01"
      onChange={e => setData({...data,image :e.target.files[0]})}/>
    </div> */}
    <button type='submit' className='btn btn-success w-50 rounded-0'>ADD</button>
  
        </form>
      </div>
    </div>
  );
}

export default AddBooks;
