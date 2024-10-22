// src/components/RentedBook.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RentedBook.css'; // Import the CSS file for styling

const RentedBook = () => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    bookId: '',
    currentTime: new Date().toISOString().slice(0, 16), // Default to current time
    dueTime: '',
  });

  useEffect(() => {
    const fetchRentedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rentedBooks');
        setRentedBooks(response.data);
      } catch (error) {
        console.error('Error fetching rented books:', error);
      }
    };

    fetchRentedBooks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dueDate = new Date(formData.currentTime);
      dueDate.setDate(dueDate.getDate() + 7); // Set due date to one week from current time
      const newRentedBook = { ...formData, dueTime: dueDate.toISOString() };
      await axios.post('http://localhost:3000/api/rentedBooks', newRentedBook);
      setRentedBooks([...rentedBooks, newRentedBook]);
      alert('Rented book created successfully!');
      setFormData({ username: '', bookId: '', currentTime: new Date().toISOString().slice(0, 16), dueTime: '' }); // Reset form
    } catch (error) {
      console.error('Error creating rented book:', error);
      alert('Error creating rented book!');
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/api/rentedBooks/${bookId}`);
      setRentedBooks(rentedBooks.filter((book) => book._id != bookId));
    } catch (error) {
      console.error('Error deleting rented book:', error);
    }
  };

  return (
    <div className="rented-books-container">
      <h2>Manage Rented Books</h2>
      <form className="rented-book-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Book ID</label>
          <input
            type="text"
            name="bookId"
            value={formData.bookId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Current Time</label>
          <input
            type="datetime-local"
            name="currentTime"
            value={formData.currentTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Create Rented Book</button>
      </form>

      {rentedBooks.length === 0 ? (
        <p>No rented books available.</p>
      ) : (
        <ul className="rented-books-list">
          {rentedBooks.map((book) => (
            <li key={book._id} className="rented-book-item">
              <div className="book-info">
                <h3>{book.bookTitle || 'Unknown Book Title'}</h3>
                <p><strong>Rented By:</strong> {book.username}</p>
                <p><strong>Rented On:</strong> {new Date(book.currentTime).toLocaleDateString()}</p>
                <p><strong>Due Date:</strong> {new Date(book.dueTime).toLocaleDateString()}</p>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RentedBook;
