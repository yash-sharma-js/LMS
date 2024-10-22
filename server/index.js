const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CORS = require('cors')

//Import models
const User = require('./Models/user.model')


// Import routes
const userRoutes = require('./Routes/user.routes');
const rentedBookRoutes = require('./Routes/rentBook.routes');
const bookRoutes = require('./Routes/book.routes')
// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(CORS())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rentedbooks', rentedBookRoutes);
app.use('/api/books',bookRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//Extra


  