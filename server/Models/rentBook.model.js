const mongoose = require('mongoose');

const rentedBookSchema = new mongoose.Schema({
    username: { type: String, required: true },
    bookId: { type: String, required: true },
    currentTime: { type: Date, default: Date.now },
    dueTime: { type: Date, required: true }
});

const RentedBook = mongoose.model('RentedBook', rentedBookSchema);

module.exports = RentedBook;
