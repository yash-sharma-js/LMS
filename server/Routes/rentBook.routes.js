const express = require('express');
const router = express.Router();
const RentedBook = require('../Models/rentBook.model');

// POST: Rent a new book
router.post('/', async (req, res) => {
    try {
        const { username, bookId } = req.body;

        // Calculate due time (1 week from now)
        const dueTime = new Date();
        dueTime.setDate(dueTime.getDate() + 7);

        const rentedBook = new RentedBook({
            username,
            bookId,
            currentTime: new Date(),
            dueTime
        });

        await rentedBook.save();
        res.status(201).json({ message: 'Book rented successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: Get all rented books
router.get('/', async (req, res) => {
    try {
        const rentedBooks = await RentedBook.find();
        res.json(rentedBooks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Delete a rented book
router.delete('/:id', async (req, res) => {
    try {
        const rentedBook = await RentedBook.findById(req.params.id);

        if (!rentedBook) {
            return res.status(404).json({ message: 'Rented book not found' });
        }

        await rentedBook.deleteOne();
        res.json({ message: 'Rented book deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
