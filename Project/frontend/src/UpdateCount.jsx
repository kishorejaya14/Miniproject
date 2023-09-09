// import React, { useEffect } from 'react'
// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';


// // function UpdateCount() {
// //   const [values,setValues]=useState({
// //     count:'',
// //     bookName:'',
// // })
// //  useEffect(()=>{
// //   axios.get('http://localhost:8082/updatebookcount',values)
// //   .then(res => {
// //      console.log(res);
// //      setAdminCount(res.data[0].admin);
// //   }).catch(err => console.log(err));
// // })
// //  const navigate=useNavigate();
// // //  setValues({bookName:bookname});
// //   const handleSubmit = (event) => {
// //     const {bookname}=useParams();
// //      setValues({bookName:bookname});
// //      console.log("value:"+values.bookName);
// //     event.preventDefault();
// //     axios.post('http://localhost:8082/updatebookcount',values)
// //     .then(res => {
// //       navigate('');
// //       })
// //     .catch(err => console.log(err));
// // }
// function UpdateCount() {
//   const [values, setValues] = useState({
//     count: '',
//     bookName: '',
//   });

//   useEffect(() => {
//     // Fetch initial data for the book count update here
//     const { bookname } = useParams();
//     axios
//       .get(`http://localhost:8082/updatebookcount/${bookname}`) // Replace with correct API endpoint
//       console.log('ani')
//       .then(res => {
//         console.log(res);
//         setValues({
//           ...values,
//           bookName: res.data.bookName,
//         });
//       })
//       .catch(err => console.log(err));
//   }, []);

//   const navigate = useNavigate();

//   const handleSubmit = event => {
//     event.preventDefault();
//     axios
//       .post('http://localhost:8082/updatebookcount', values)
//       .then(res => {
//         navigate('/');
//       })
//       .catch(err => console.log(err));
//   };
//   return (
//     <div className='d-flex justify-content-center align-items-center vh-100'>
//         <div className='p-3 rounded w-25 border shadow homepage '>
//             <h3>Update Count</h3>
//             <form className='homepage' onSubmit={handleSubmit}>
//                 <div>
//                     <label className='ml-3 mt-2'>Count: </label>
//                     <input type='number' name='count' id='count' onChange={e => setValues({...values,count: e.target.value})}
//                      className='m-lg-1 form-control'/>
//                     <button type='submit' className='btn btn-success m-lg-3 m-2 mb-5'>Update</button>
//                 </div>
//             </form>

//         </div>
     
//     </div>
//   )
// }

// export default UpdateCount

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateCount() {
  const [values, setValues] = useState({
    count: '',
    bookName: '',
  });

  const { bookname } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial data for the book count update here
    axios
      .post('http://localhost:8082/updatebookcount',{ bookname: bookname,count:count })
      .then(res => {
        console.log('Fetched data:', res.data);

        setValues({
          ...values,
          bookName: res.data.bookName,
        });
      })
      .catch(err => console.log('error '));
  }, [bookname]);

  const handleSubmit = event => {
    // const bookname=useParams();
    console.log(bookname);
    event.preventDefault();
    const data = {
      bookname: bookname,
      count: values.count // Assuming values.count contains the updated count
    };
    axios
      .post('http://localhost:8082/updatebookcount',data)
      .then(res => {
        navigate('/');
      })
      .catch(err => console.log(err+'anihta'));
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='p-3 rounded w-25 border shadow homepage '>
        <h3>Update Count</h3>
        <form className='homepage' onSubmit={handleSubmit}>
          <div>
            <label className='ml-3 mt-2'>Count: </label>
            <input
              type='number'
              name='count'
              id='count'
              value={values.count}
              onChange={e => setValues({ ...values, count: e.target.value })}
              className='m-lg-1 form-control'
            />
            <button type='submit' className='btn btn-success m-lg-3 m-2 mb-5'>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCount;
