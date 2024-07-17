const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de la conexión a la base de datos usando variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
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

// CRUD para datos_usuario
app.get('/datos_usuario', (req, res) => {
  const query = 'SELECT * FROM datos_usuario';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.json(results);
  });
});

app.post('/datos_usuario', (req, res) => {
  const { nombre, edad, sexo, emocion, color, musica } = req.body;
  const query = 'INSERT INTO datos_usuario (nombre, edad, sexo, emocion, color, musica) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [nombre, edad, sexo, emocion, color, musica], (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
});

app.put('/datos_usuario/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, edad, sexo, emocion, color, musica } = req.body;
  const query = 'UPDATE datos_usuario SET nombre = ?, edad = ?, sexo = ?, emocion = ?, color = ?, musica = ? WHERE id = ?';
  db.query(query, [nombre, edad, sexo, emocion, color, musica, id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos actualizados correctamente' });
  });
});

app.delete('/datos_usuario/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM datos_usuario WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos eliminados correctamente' });
  });
});

// CRUD para emociones_negativas
app.get('/emociones_negativas', (req, res) => {
  const query = 'SELECT * FROM emociones_negativas';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.json(results);
  });
});

app.post('/emociones_negativas', (req, res) => {
  const { emocion, color, musica } = req.body;
  const query = 'INSERT INTO emociones_negativas (emocion, color, musica) VALUES (?, ?, ?)';
  db.query(query, [emocion, color, musica], (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
});

app.put('/emociones_negativas/:id', (req, res) => {
  const { id } = req.params;
  const { emocion, color, musica } = req.body;
  const query = 'UPDATE emociones_negativas SET emocion = ?, color = ?, musica = ? WHERE id = ?';
  db.query(query, [emocion, color, musica, id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos actualizados correctamente' });
  });
});

app.delete('/emociones_negativas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM emociones_negativas WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos eliminados correctamente' });
  });
});

// CRUD para emociones_neutras
app.get('/emociones_neutras', (req, res) => {
  const query = 'SELECT * FROM emociones_neutras';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.json(results);
  });
});

app.post('/emociones_neutras', (req, res) => {
  const { emocion, color, musica } = req.body;
  const query = 'INSERT INTO emociones_neutras (emocion, color, musica) VALUES (?, ?, ?)';
  db.query(query, [emocion, color, musica], (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
});

app.put('/emociones_neutras/:id', (req, res) => {
  const { id } = req.params;
  const { emocion, color, musica } = req.body;
  const query = 'UPDATE emociones_neutras SET emocion = ?, color = ?, musica = ? WHERE id = ?';
  db.query(query, [emocion, color, musica, id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos actualizados correctamente' });
  });
});

app.delete('/emociones_neutras/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM emociones_neutras WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos eliminados correctamente' });
  });
});

// CRUD para emociones_positivas
app.get('/emociones_positivas', (req, res) => {
  const query = 'SELECT * FROM emociones_positivas';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.json(results);
  });
});

app.post('/emociones_positivas', (req, res) => {
  const { emocion, color, musica } = req.body;
  const query = 'INSERT INTO emociones_positivas (emocion, color, musica) VALUES (?, ?, ?)';
  db.query(query, [emocion, color, musica], (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
});

app.put('/emociones_positivas/:id', (req, res) => {
  const { id } = req.params;
  const { emocion, color, musica } = req.body;
  const query = 'UPDATE emociones_positivas SET emocion = ?, color = ?, musica = ? WHERE id = ?';
  db.query(query, [emocion, color, musica, id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos actualizados correctamente' });
  });
});

app.delete('/emociones_positivas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM emociones_positivas WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos eliminados correctamente' });
  });
});

// CRUD para historial_emociones_mensual
app.get('/historial_emociones_mensual', (req, res) => {
  const query = 'SELECT * FROM historial_emociones_mensual';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.json(results);
  });
});

app.post('/historial_emociones_mensual', (req, res) => {
  const { id_usuario, nombre, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre } = req.body;
  const query = 'INSERT INTO historial_emociones_mensual (id_usuario, nombre, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [id_usuario, nombre, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre], (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
});

app.put('/historial_emociones_mensual/:id', (req, res) => {
  const { id } = req.params;
  const { id_usuario, nombre, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre } = req.body;
  const query = 'UPDATE historial_emociones_mensual SET id_usuario = ?, nombre = ?, enero = ?, febrero = ?, marzo = ?, abril = ?, mayo = ?, junio = ?, julio = ?, agosto = ?, septiembre = ?, octubre = ?, noviembre = ?, diciembre = ? WHERE id = ?';
  db.query(query, [id_usuario, nombre, enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre, id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos actualizados correctamente' });
  });
});

app.delete('/historial_emociones_mensual/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM historial_emociones_mensual WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos eliminados correctamente' });
  });
});

// CRUD para login
app.get('/login', (req, res) => {
  const query = 'SELECT * FROM login';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.json(results);
  });
});

app.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;
  const query = 'INSERT INTO login (correo, contrasena) VALUES (?, ?)';
  db.query(query, [correo, contrasena], (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
});

app.put('/login/:id', (req, res) => {
  const { id } = req.params;
  const { correo, contrasena } = req.body;
  const query = 'UPDATE login SET correo = ?, contrasena = ? WHERE id = ?';
  db.query(query, [correo, contrasena, id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
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
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos eliminados correctamente' });
  });
});

// CRUD para usuario
app.get('/usuario', (req, res) => {
  const query = 'SELECT * FROM usuario';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.json(results);
  });
});

app.post('/usuario', (req, res) => {
  const { correo, contrasena } = req.body;
  const query = 'INSERT INTO usuario (correo, contrasena) VALUES (?, ?)';
  db.query(query, [correo, contrasena], (err, result) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(201).json({ id: result.insertId });
  });
});

app.put('/usuario/:id', (req, res) => {
  const { id } = req.params;
  const { correo, contrasena } = req.body;
  const query = 'UPDATE usuario SET correo = ?, contrasena = ? WHERE id = ?';
  db.query(query, [correo, contrasena, id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos actualizados correctamente' });
  });
});

app.delete('/usuario/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuario WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).json({ error: 'Error ejecutando la consulta' });
      return;
    }
    res.status(200).json({ message: 'Datos eliminados correctamente' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});