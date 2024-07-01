const cors = require('cors')
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'vidal',
  password: '123',  // Utiliza la contraseña que asignaste al usuario vidal
  database: 'speedmentoring'
});

// Verificar la conexión a la base de datos MySQL
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a la base de datos MySQL:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');

  // Liberar la conexión
  connection.release();
});

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Endpoint para manejar el login
app.post('/api/login', (req, res) => {
  const { AlumnoID, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión:', err.stack);
      res.status(500).json({ message: 'Error en el servidor' });
      return;
    }

    const query = 'SELECT * FROM speedmentoring_alumno WHERE alumnoid = ?';
    connection.query(query, [AlumnoID], (error, results, fields) => {
      if (error) {
        console.error('Error en la consulta de inicio de sesión:', error.stack);
        res.status(500).json({ message: 'Error en el servidor' });
        return;
      }

      if (results.length === 0) {
        res.status(401).json({ message: 'Alumno no encontrado' });
      } else {
        const user = results[0];

        if (password === user.password) {
          res.json({ message: 'Inicio de sesión exitoso' });
          console.log(`Alumno: ${AlumnoID}, Contraseña: ${password}`);
        } else {
          res.status(401).json({ message: 'Contraseña incorrecta' });
        }
      }

      // Liberar la conexión
      connection.release();
    });
  });
});

// Iniciar el servidor Express
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
