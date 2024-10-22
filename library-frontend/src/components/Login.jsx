// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Form.css'; // Import the CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', formData);
      const userId = response.data._id;
      localStorage.setItem('userId', userId); // Store user ID in localStorage
      alert('Login successful!');
      window.location.href = '/manage-rented-books'; // Redirect to Manage Rented Books after login
    } catch (error) {
      alert('Invalid username or password!');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
