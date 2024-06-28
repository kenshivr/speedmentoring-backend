const cors = require('cors');
const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SpeedMentoring',
  password: '1234',
  port: 5432
});

// Verificar la conexión a la base de datos
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error al conectar a la base de datos:', err.stack);
  }
  console.log('Conexión a la base de datos establecida');

  // Liberar el cliente de la conexión
  release();
});

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Endpoint para manejar el login
app.post('/api/login', async (req, res) => {
  const { AlumnoID, password } = req.body;

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM "SpeedMentoring_Alumno" WHERE "AlumnoID" = $1';
    const result = await client.query(query, [AlumnoID]);

    if (result.rows.length === 0) {
      res.status(401).json({ message: 'Alumno no encontrado' });
    } else {
      const user = result.rows[0];

      if (password === user.Password) {
        res.json({ message: 'Inicio de sesión exitoso' });
        console.log(`Alumno: ${AlumnoID}, Contraseña: ${password}`)
      } else {
        res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    }
    client.release();
  } catch (err) {
    console.error('Error en la consulta de inicio de sesión:', err.stack);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Iniciar el servidor Express
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});