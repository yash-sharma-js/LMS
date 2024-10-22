// src/components/Books.jsx
import React, { useEffect, useState } from 'react';
import './Books.css'; // Make sure you have your styling for the component

const Books = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Function to copy book ID to clipboard
  const copyToClipboard = (bookId) => {
    navigator.clipboard.writeText(bookId)
      .then(() => {
        alert('Book ID copied to clipboard!');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <div className="books-container">
      <h2>Books</h2>
      <ul className="books-list">
        {books.map((book) => (
          <li key={book._id} className="book-item">
            <img src={book.imageUrl} alt={book.title} className="book-image" />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <button onClick={() => copyToClipboard(book._id)} className="copy-button">
                Copy Book ID
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
