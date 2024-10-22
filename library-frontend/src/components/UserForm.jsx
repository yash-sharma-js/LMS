// src/components/UserForm.jsx
import React, { useState } from 'react';
import { createUser, getUser } from '../api';

const UserForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [user, setUser] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async () => {
    try {
      await createUser(formData);
      alert('User created successfully');
    } catch (error) {
      alert('Error creating user');
    }
  };

  const handleGetUser = async () => {
    try {
      const response = await getUser(formData.username);
      setUser(response.data);
    } catch (error) {
      alert('Error fetching user');
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button onClick={handleCreateUser}>Create User</button>

      <h2>Get User</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
      <button onClick={handleGetUser}>Get User</button>

      {user && (
        <div>
          <h3>User Details</h3>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserForm;
