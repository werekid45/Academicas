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

      // Create quizzes table
      db.run(`CREATE TABLE IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        content TEXT NOT NULL
    )`);
    
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

// Save Quiz Endpoint
app.post('/quizzes', (req, res) => {
  const { name, content } = req.body;
  const sql = `INSERT INTO quizzes (name, content) VALUES (?, ?)`;
  db.run(sql, [name, content], (err) => {
      if (err) {
          res.status(400).json({ error: err.message });
          return;
      }
      res.json({ message: 'Quiz saved successfully' });
  });
});

// Retrieve Quizzes Endpoint
app.get('/quizzes', (req, res) => {
  db.all(`SELECT * FROM quizzes`, [], (err, rows) => {
      if (err) {
          res.status(400).json({ error: err.message });
          return;
      }
      res.json({ quizzes: rows });
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

app.post('/add-quiz', (req, res) => {
  const { name } = req.body;
  const sql = `INSERT INTO quizzes (name) VALUES (?)`;
  db.run(sql, [name], function(err) {
      if (err) {
          res.status(400).send(err.message);
          return;
      }
      res.status(201).send(`Quiz added with ID: ${this.lastID}`);
  });
});

app.post('/add-question', (req, res) => {
  const { quiz_id, question, correct_answer } = req.body;
  const sql = `INSERT INTO questions (quiz_id, question, correct_answer) VALUES (?, ?, ?)`;
  db.run(sql, [quiz_id, question, correct_answer], function(err) {
      if (err) {
          res.status(400).send(err.message);
          return;
      }
      res.status(201).send(`Question added with ID: ${this.lastID}`);
  });
});

app.get('/quiz-questions/:quizId', (req, res) => {
  const { quizId } = req.params;
  db.all(`SELECT * FROM questions WHERE quiz_id = ?`, [quizId], (err, rows) => {
      if (err) {
          res.status(400).json({ error: err.message });
          return;
      }
      res.json({ questions: rows });
  });
});


