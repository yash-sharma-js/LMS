const express = require('express');
const router = express.Router();
const User = require('../Models/user.model');

// POST: Create a new user
router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Create and save user
        const newUser = new User({ username, email, password });
        await newUser.save();
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: Get a user by username
router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// In your Express backend
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username, password });
      console.log(user)
      if (user) {
        res.json({ _id: user._id });
      } else {
        res.status(400).send('Invalid username or password');
      }
    } catch (error) {
      res.status(500).send('Error logging in');
    }
  });

module.exports = router;
