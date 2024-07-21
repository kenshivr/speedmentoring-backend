const pool = require('../config/db'); // Conexión a la base de datos

// Endpoint para actualizar el perfil del mentor
const updateProfileMentor = (req, res) => {
  const userId = req.params.userId;
  const { telefono, correo, empresa, puesto, grado, especialidad } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const updateQuery = `
      UPDATE 
        SpeedMentoring_Mentor 
      SET 
        NumeroTelefono = ?, CorreoElectronico = ?, Empresa = ?, Puesto = ?, GradoAcademico = ?, 
        EspecialidadID = (SELECT EspecialidadID FROM Especialidad WHERE Especialidad = ? ) 
      WHERE 
        MentorRFC = ?;
    `;

    connection.query(updateQuery, [telefono, correo, empresa, puesto, grado, especialidad, userId], (updateError, results) => {
      connection.release();

      if (updateError) {
        console.error('Error al actualizar el perfil:', updateError.stack);
        res.status(500).json({ message: 'Error al actualizar el perfil' });
        return;
      }

      res.json({ message: 'Perfil actualizado exitosamente' });
    });
  });
};

module.exports = { updateProfileMentor };