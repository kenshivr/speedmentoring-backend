const pool = require('../config/db');

const changePass = (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const queryMentor = 'SELECT * FROM speedmentoring_mentor WHERE mentorrfc = ?';
    connection.query(queryMentor, [userId], (error, results) => {
      if (error) {
        console.error('Error en la consulta (mentor):', error.stack);
        res.status(500).json({ message: 'Error en la consulta (mentor)' });
        connection.release();
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: 'Mentor no encontrado' });
      } else {
        const mentor = results[0];

        if (mentor.hash !== currentPassword) {
          res.status(401).json({ message: 'Contraseña actual incorrecta' });
        } else {
          const updateQuery = 'UPDATE speedmentoring_mentor SET hash = ? WHERE mentorrfc = ?';
          connection.query(updateQuery, [newPassword, userId], (updateError) => {
            if (updateError) {
              console.error('Error al actualizar la contraseña:', updateError.stack);
              res.status(500).json({ message: 'Error al actualizar la contraseña' });
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