import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReturnBook() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const fetchBorrowedBooks = () => {
    axios.get('http://localhost:8082/getborrowedbooks')
      .then(res => {
        setBorrowedBooks(res.data.Result);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const handleReturnBook = (bookId, bookName) => {
    console.log(bookName);
    axios.post('http://localhost:8082/returnbook', { bookName })
      .then(res => {
        if (res.data.Status === 'Success') {
          fetchBorrowedBooks(); // Fetch updated borrowed books after returning
        } else {
          console.log(res.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div >
      <h3 className=' text-center'>Return The Book</h3>
      <table className='table'>
        <thead><strong>Name of the Book</strong></thead>
      </table>
      <tbody>
        <tr>
        {borrowedBooks.map(book => (
          <div key={book.id} className='homepage'>
           <td><p>{book.bookname} </p></td> 
           <td><button className='btn btn-success' onClick={() => handleReturnBook(book.id, book.bookname)}>Return</button></td>
            <hr></hr>
          </div>
        ))}
        </tr>
      </tbody>
    </div>
  );
}

export default ReturnBook;
