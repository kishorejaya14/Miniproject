import React from 'react'
import { useNavigate } from 'react-router-dom'

function Start() {
  const navigate=useNavigate();
  return (
    <div className='original'>
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className=' p-2 rounded w-25 border loginForm mt-4'>
            <h2 className='text-center black'>Login As</h2>
            <div className='d-flex justify-content-between mt-3'>
                <button className='btn btn-primary btn-lg' onClick={e =>navigate('/userlogin')}>User</button>
                <button className='btn btn-success btn-lg' onClick={e=> navigate('/login')}>Admin</button>
            </div>

     </div>
    </div>
    <div className='footer mt-4'>
      <p className='text-center'>Library Management System © 2023</p>
        <p className='text-center'>Contact us :: 6302931930</p>
        <p className='text-center'>Email us: <a href='admin@gmail.com'>admin@gmail.com</a></p>
    </div>
    </div>
  )
}

export default Start
