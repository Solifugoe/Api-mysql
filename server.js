const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'oaxacapower.org',
  user: 'u744130986_theraglow',
  password: 'KaizoIntegradora2024',
  database: 'u744130986_theraglow'
});
// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Middleware para parsear JSON
app.use(express.json());

// CRUD para login
app.get('/login', (req, res) => {
  const query = 'SELECT * FROM login';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta', details: err });
      return;
    }
    res.json(results);
  });
});

app.post('/login', (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const query = 'INSERT INTO login (nombre, correo, contrasena) VALUES (?, ?, ?)';
  db.query(query, [nombre, correo, contrasena], (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta', details: err });
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
});

app.put('/login/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contrasena } = req.body;
  const query = 'UPDATE login SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?';
  db.query(query, [nombre, correo, contrasena, id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta', details: err });
      return;
    }
    res.status(200).json({ message: 'Datos actualizados correctamente' });
  });
});

app.delete('/login/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM login WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta', details: err });
      return;
    }
    res.status(200).json({ message: 'Datos eliminados correctamente' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});