import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode'; 

function Borrow() {
  const { bookname } = useParams();
  const navigate = useNavigate();
  const [useremail,setUserEmail]=useState({
    email:'',
  });
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
  const usernameFromCookie=userData.username;
  console.log(userData.username);
  useEffect(() => {
    const usernameFromCookie = userData.username;
  
    if (usernameFromCookie) {
      // Fetch the email associated with the username
      axios.get('http://localhost:8082/userdashboard/userdetail/'+usernameFromCookie)
        .then((res) => {
          const userEmail = res.data.Result.email;
          console.log(res.data.Result.email);
          setUserEmail({ email: userEmail }); 
          setData({ ...data, username: usernameFromCookie, email: userEmail });
  
        })
        .catch((error) => {
          console.error("Error fetching email:", error);
        });
    }
  }, []);
  
  // const value=email;
  const us=userData.username;
  const [data, setData] = useState({
    username: us,
    email: '',
    bookname: bookname, // Set the bookname from the URL parameter
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formdata = new FormData();
    formdata.append("username", data.username);
    formdata.append("email", data.email);
    formdata.append("bookname", data.bookname);

    axios.post('http://localhost:8082/insertborrow', formdata)
      .then((res) => {
        navigate('/userdashboard/takebook');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className='text-center ms-5 justify-content-center register'>
        <h2>Borrow Books</h2>
      </div>
      <div className='d-flex align-content-center pt-4'>
        <form className='row g-4 w-50 justify-content-center border shadow m-auto homepage' onSubmit={handleSubmit}>
          <div className='col-12'>
            <label htmlFor='inputuser4' className='form-label'>Username</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter Borrower Username'
              name='username'
              id='username'
              value={data.username} // Automatically filled value
              readOnly
            />
          </div>
          <div className='col-12'>
            <label htmlFor='inputEmail4' className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              placeholder='Enter Borrower Email'
              name='email'
              id='email'
              value={data.email} // Automatically filled value
              readOnly
            />
          </div>
          <div className='col-12'>
            <label htmlFor='inputbookname4' className='form-label'>Bookname</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter Bookname'
              name='bookname'
              id='bookname'
              value={data.bookname} // Automatically filled value
              readOnly
            />
          </div>
          <button type='submit' className='btn btn-success w-50 rounded-25'>Borrow</button>
        </form>
      </div>
    </div>
  );
}

export default Borrow;
