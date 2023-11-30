const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Import database functions from your database.js file
const db = require('./database'); 

app.use(cors());
app.use(express.json());

// Endpoint to register a new user
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    db.createUser(email, password, (err, userId) => {
        if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(409).json({ message: 'Email already exists' });
            }
            console.error(err.message);
            return res.status(500).json({ message: 'An error occurred during registration' });
        }
        res.status(201).json({ message: `User created with ID: ${userId}` });
    });
});

// Endpoint to get user profile
app.get('/profile/:id', (req, res) => {
    const userId = req.params.id;
    db.getUserById(userId, (err, user) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal server error');
        }

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    });
});

// Additional endpoints for quizzes will go here

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
