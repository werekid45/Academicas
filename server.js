const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./userDatabase.db', (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Connected to SQLite database.');
    
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    db.run(sql, [email, password], function(err) {
        if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(409).json({ message: 'Email already exists' });
            }
            console.error(err.message);
            return res.status(500).json({ message: 'An error occurred during registration' });
        }
        res.status(201).json({ message: `A new user has been created with ID: ${this.lastID}` });
    });
});

app.get('/profile/:id', (req, res) => {
    const userId = req.params.id;
    db.get("SELECT id, email FROM users WHERE id = ?", [userId], function(err, row) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send('Internal server error');
        }
        if (!row) {
            return res.status(404).send('User not found');
        }
        res.json({
            id: row.id,
            email: row.email
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
