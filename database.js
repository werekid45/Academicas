const sqlite3 = require('sqlite3').verbose();

// Open a database connection
const db = new sqlite3.Database('./userDatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQLite database.');

        // Create users table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )`);

        // Create quizzes table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS quizzes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            content TEXT NOT NULL
        )`);

        // Create flashcards table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS flashcards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            topic TEXT
        )`);
    }
});



// Function to create a new user
function createUser(email, password, callback) {
    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    db.run(sql, [email, password], function(err) {
        callback(err, this.lastID);
    });
}

// Function to get a user by ID
function getUserById(userId, callback) {
    db.get("SELECT * FROM users WHERE id = ?", [userId], function(err, row) {
        callback(err, row);
    });
}

module.exports = {
    createUser,
    getUserById
};
