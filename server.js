// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'sofiatech' // Your database name
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// CRUD Routes
app.post('/users', (req, res) => {
  const { name, surname, password, phoneNumber } = req.body;
  const query = 'INSERT INTO user (name, surname, password, phoneNumber) VALUES (?, ?, ?, ?)';
  db.query(query, [name, surname, password, phoneNumber], (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ idUser: result.insertId, name, surname, password, phoneNumber });
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

app.get('/users/:idUser', (req, res) => {
  db.query('SELECT * FROM user WHERE idUser = ?', [req.params.idUser], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(results[0]);
  });
});

app.put('/users/:idUser', (req, res) => {
  const { name, surname, password, phoneNumber } = req.body;
  const query = 'UPDATE user SET name = ?, surname = ?, password = ?, phoneNumber = ? WHERE idUser = ?';
  db.query(query, [name, surname, password, phoneNumber, req.params.idUser], (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ idUser: req.params.idUser, name, surname, password, phoneNumber });
  });
});

app.delete('/users/:idUser', (req, res) => {
  db.query('DELETE FROM user WHERE idUser = ?', [req.params.idUser], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
