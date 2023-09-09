import React from "react";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from 'axios';
function EditUser() {
  const { username } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/useredit/'+username)
      .then(res => {
        console.log("in page"+res.data.Result);
        setBooks(res.data.Result);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [username]);

  return (
    <div className="homepage">
      <h3>Books Taken by: {username}</h3>
      <h3 className="text-center">List of Books</h3>
      <table className="table homepage">
        <thead className="addbooks">
          <tr>
            <th>Name of the book</th>
          </tr>
        </thead>
        <tbody>
        {books && books.length > 0 ? (
          books.map((book, index) => (
            <tr key={index}>
              <td>{book}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>No books Taken</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}
export default EditUser;