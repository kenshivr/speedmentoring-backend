const pool = require('../config/db');

const login = (req, res) => {
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

      connection.release();
    });
  });
};

module.exports = { login };