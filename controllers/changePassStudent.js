const pool = require('../config/db');

const changePass = (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos (Alumno):', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos (Alumno)' });
      return;
    }

    const queryMentor = 'SELECT * FROM SpeedMentoring_Alumno WHERE AlumnoID = ? ';
    connection.query(queryMentor, [userId], (error, results) => {
      if (error) {
        console.error('Error en la consulta (Alumno):', error.stack);
        res.status(500).json({ message: 'Error en la consulta (Alumno)' });
        connection.release();
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: 'Alumno no encontrado' });
      } else {
        const alumno = results[0];

        if (alumno.Password !== currentPassword) {
          res.status(401).json({ message: 'Contraseña actual incorrecta' });
        } else {
          const updateQuery = 'UPDATE SpeedMentoring_Alumno SET Password = ? WHERE AlumnoID = ?';
          connection.query(updateQuery, [newPassword, userId], (updateError) => {
            if (updateError) {
              console.error('Error al actualizar la contraseña (Alumno) :', updateError.stack);
              res.status(500).json({ message: 'Error al actualizar la contraseña (Alumno) ' });
            } else {
              res.json({ success: true, message: 'Contraseña actualizada correctamente' });
            }
            connection.release();
          });
        }
      }
    });
  });
};

module.exports = { changePass };