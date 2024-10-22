// src/Models/book.model.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String },
});

// Check if the model already exists; if it does, use that instead of creating a new one
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

module.exports = Book;
