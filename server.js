const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: 'oaxacapower.org',
  user: 'u744130986_theraglow',
  password: 'KaizoIntegradora2024',
  database: 'u744130986_theraglow'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Define rutas API
app.get('/api/items', (req, res) => {
  const sql = 'SELECT * FROM datos_usuario';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  const sql = 'INSERT INTO datos_usuario SET ?';
  db.query(sql, newItem, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(result);
  });
});

// Nueva ruta para datos de emociones
app.get('/api/emociones', (req, res) => {
  const sqlNegativas = 'SELECT * FROM emociones_negativas';
  const sqlNeutras = 'SELECT * FROM emociones_neutras';
  const sqlPositivas = 'SELECT * FROM emociones_positivas';

  const emociones = {};

  db.query(sqlNegativas, (err, resultadosNegativos) => {
    if (err) {
      return res.status(500).send(err);
    }
    emociones.negativas = resultadosNegativos;

    db.query(sqlNeutras, (err, resultadosNeutros) => {
      if (err) {
        return res.status(500).send(err);
      }
      emociones.neutras = resultadosNeutros;

      db.query(sqlPositivas, (err, resultadosPositivos) => {
        if (err) {
          return res.status(500).send(err);
        }
        emociones.positivas = resultadosPositivos;

        res.json(emociones);
      });
    });
  });
});

// Nueva ruta para datos de historial de emociones mensual
app.get('/api/historial-emociones-mensual', (req, res) => {
  const sql = 'SELECT * FROM historial_emociones_mensual';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
