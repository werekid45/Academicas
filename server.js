const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000; // You can choose any available port

// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// Create an array to store registered users (replace with a database in a real application)
const registeredUsers = [];

// Serve static files (e.g., HTML, CSS)
app.use(express.static('public'));

// Replace with your MongoDB Atlas connection string
const mongoUri = 'mongodb+srv://ehedgepe:<UoS3QVh5W48dq51J>@cluster0.ozjpntj.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Register route
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        await client.connect();
        const db = client.db('<your-database-name>');
        const collection = db.collection('users');

        // Check if the user already exists based on the email
        const existingUser = await collection.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }

        // You should hash and salt the password for security; use bcrypt or a similar library

        // Insert the user data into the 'users' collection
        const result = await collection.insertOne({ email, password });
        console.log(`Inserted ${result.insertedCount} user into the database.`);
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registration failed.' });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
