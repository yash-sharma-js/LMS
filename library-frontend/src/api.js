// src/api.js
import axios from 'axios';

// Backend API URL
const API_URL = 'http://localhost:3000/api';

// User API calls
export const createUser = async (userData) => {
  return await axios.post(`${API_URL}/users`, userData);
};

export const getUser = async (username) => {
  return await axios.get(`${API_URL}/users/${username}`);
};

// RentedBook API calls
export const rentBook = async (rentedBookData) => {
  return await axios.post(`${API_URL}/rentedbooks`, rentedBookData);
};

export const getAllRentedBooks = async () => {
  return await axios.get(`${API_URL}/rentedbooks`);
};

export const deleteRentedBook = async (id) => {
  return await axios.delete(`${API_URL}/rentedbooks/${id}`);
};
