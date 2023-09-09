import React, { useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function UserLogin() {
    const [values,setValues]=useState({
        email: ' ',
        password: ' '
    })
    const navigate = useNavigate()
    
    axios.defaults.withCredentials=true;

    const [error,setError] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8082/userlogin',values)
        .then(res => {
          if(res.data.Status === 'Success'){
             const username=res.data.username;
            //  navigate('/userdetail/'+username);
            navigate('/userdashboard');
          }
          else{
             setError(res.data.Error);
          }
        })
        .catch(err => console.log(err));
    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className=' p-3 rounded w-25 border loginForm'>
          <div className='text-danger'>
            {error && error}
          </div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input type='email' placeholder='Enter Email' name='email' 
                onChange={e => setValues({...values,email: e.target.value})} className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor='password'><strong>Password</strong></label>
                <input type='password' placeholder='Enter password' name='password'
                onChange={e=>setValues({...values,password: e.target.value})} className='form-control rounded-0'/>
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Login in</button>
            <p>You agree to our terms and conditions</p>
           <p>Don't have an account----
           <Link to={'/register'} className='btn btn-light'>Register</Link></p>
          </form>
        </div>
      
    </div>
  )
}

export default UserLogin
