// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ManageRentedBooks from './components/ManageRentedBooks'; // Import your ManageRentedBooks component
import Books from './components/Books'; // Import your Books component
import './App.css'; // Add CSS for styling

const App = () => {
  // Check if user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem('userId') !== null;
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    alert('You have been logged out.');
  };

  return (
    <Router>
      <header className="navbar">
        <h1 className="navbar-title">Library Manager</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/manage-rented-books">Manage Rented Books</Link></li>
            <li><Link to="/books">Books</Link></li>
            {isLoggedIn() && <li><button onClick={handleLogout}>Logout</button></li>}
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protect the Manage Rented Books route */}
        <Route path="/manage-rented-books" element={isLoggedIn() ? <ManageRentedBooks /> : <Navigate to="/login" />} />
        <Route path="/books" element={<Books />} /> {/* Add the Books route */}
      </Routes>
    </Router>
  );
};

export default App;
