const cors = require('cors');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'vidal',
  password: '123',
  database: 'speedmentoring'
});

// Verificar la conexión a la base de datos MySQL
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a la base de datos MySQL:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
  connection.release();
});

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mentoringspeed@gmail.com',
    pass: 'speedmentoring123'
  }
});

// Endpoint para manejar el login
app.post('/api/login', (req, res) => {
  const { AlumnoID, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión:', err.stack);
      res.status(500).json({ message: 'Error en el servidor' });
      return;
    }

    const query = 'SELECT * FROM speedmentoring_alumno WHERE AlumnoID = ?';
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

// Endpoint para manejar la búsqueda del correo
app.post('/api/buscar', (req, res) => {
  const { email } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión:', err.stack);
      res.status(500).json({ message: 'Error en el servidor' });
      return;
    }

    const query = 'SELECT * FROM speedmentoring_alumno WHERE correo = ?';
    connection.query(query, [email], (error, results, fields) => {
      if (error) {
        console.error('Error en la consulta:', error.stack);
        res.status(500).json({ message: 'Error en el servidor' });
        return;
      }

      if (results.length === 0) {
        console.log('No existe el correo en la base de datos');
        res.json({ success: false });
      } else {
        const user = results[0];
        const nuevaContraseña = 'nuevaContraseña123';

        const mailOptions = {
          from: 'mentoringspeed@gmail.com',
          to: 'mentoringspeed@gmail.com',
          subject: 'Recuperación de contraseña',
          text: `Tu nueva contraseña es: ${nuevaContraseña}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error('Error al enviar el correo:', err);
            res.status(500).json({ message: 'Error en el servidor' });
            return;
          }
          console.log('Correo enviado:', info.response);
          res.json({ success: true });
        });
      }

      connection.release();
    });
  });
});

// Iniciar el servidor Express
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});