const pool = require('../config/db'); // Conexión a la base de datos

// Endpoint para obtener el perfil del mentor
const getUserProfile = (req, res) => {
  const { userId } = req.params; // El userId es el RFC del mentor para identificarlo

  pool.getConnection((err, connection) => {
    if (err) { // En caso de error en la base de datos
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const mentorQuery = `
      SELECT 
        m.Nombre, 
        m.NumeroTelefono, 
        m.CorreoElectronico, 
        m.Empresa, 
        m.Puesto, 
        e.Especialidad 
      FROM 
        SpeedMentoring_Mentor m
      JOIN 
        Especialidad e ON m.EspecialidadID = e.EspecialidadID
      WHERE 
        m.MentorRFC = ?
    `; // Query para obtener los datos que pueden ser actualizados por parte del mentor

    connection.query(mentorQuery, [userId], (mentorError, mentorResults) => {
      if (mentorError) { // Si hay un error en el query del mentor
        connection.release();
        console.error('Error al obtener el perfil:', mentorError.stack); 
        res.status(500).json({ message: 'Error al obtener el perfil' });
        return;
      }

      if (mentorResults.length === 0) { // Si no se encuentra ningún mentor con ese RFC
        connection.release();
        res.status(404).json({ message: 'Perfil no encontrado' });
        return;
      }

      const specialitiesQuery = `
        SELECT Especialidad FROM Especialidad
      `; // Query para obtener todas las especialidades únicas

      connection.query(specialitiesQuery, (specialitiesError, specialitiesResults) => {
        connection.release();

        if (specialitiesError) { // Si hay un error en el query de especialidades
          console.error('Error al obtener las especialidades:', specialitiesError.stack); 
          res.status(500).json({ message: 'Error al obtener las especialidades' });
          return;
        }

        const response = {
          mentor: mentorResults[0],
          especialidades: specialitiesResults.map(row => row.Especialidad)
        };

        res.json(response); // Se responden los datos del mentor y las especialidades a la solicitud GET
      });
    });
  });
};

// Endpoint para actualizar el perfil del mentor
const updateProfile = (req, res) => {
  const { userId, phoneNumber, email, company, position, specialty } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const updateQuery = `
      UPDATE SpeedMentoring_Mentor 
      SET 
        NumeroTelefono = ?, 
        CorreoElectronico = ?, 
        Empresa = ?, 
        Puesto = ?, 
        EspecialidadID = (SELECT EspecialidadID FROM Especialidad WHERE Especialidad = ? )
      WHERE 
        MentorRFC = ?
    `;

    connection.query(updateQuery, [phoneNumber, email, company, position, specialty, userId], (updateError, results) => {
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

module.exports = { getUserProfile, updateProfile };
