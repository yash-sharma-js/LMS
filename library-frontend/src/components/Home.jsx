// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Library Management System</h1>
      <p className="home-description">Easily manage users and rented books with just a few clicks.</p>

      <div className="button-container">
        <Link to="/signup" className="home-button">
          Sign-up
        </Link>
        <Link to="/manage-rented-books" className="home-button">
        Manage Rented Books
        </Link>
      </div>
    </div>
  );
};

export default Home;
