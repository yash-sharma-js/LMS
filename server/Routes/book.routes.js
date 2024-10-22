// src/Routes/book.routes.js
const Book = require('../Models/book.model'); // Ensure the path is correct
const express = require('express');
const router = express.Router();

// API to get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books' });
  }
});

// API to create a new book
router.post('/', async (req, res) => {
  const { title, author, imageUrl } = req.body;

  const newBook = new Book({ title, author, imageUrl });

  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: 'Error creating book' });
  }
});

module.exports = router;
