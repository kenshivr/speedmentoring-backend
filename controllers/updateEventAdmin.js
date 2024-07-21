const pool = require('../config/db'); // Conexión a la base de datos

// Endpoint para actualizar un evento desde el admin
const updateEvent = (req, res) => {
  const eventId = req.params.eventId;
  const { eventName, specialty, description, date, link } = req.body;

  console.log(eventId);
  console.log(eventName);
  console.log(specialty);
  console.log(description);
  console.log(date);
  console.log(link);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const updateQuery = `
      UPDATE 
        Eventos 
      SET 
        EspecialidadID = 
        (SELECT EspecialidadID FROM Especialidad WHERE Especialidad = ? ), 
        Nombre = ? , 
        Descripción = ? , 
        Fecha = ? , 
        Link = ? 
      WHERE 
        EventoID = ?
    `;

    connection.query(updateQuery, [specialty, eventName, description, date, link, eventId], (updateError, results) => {
      connection.release();

      if (updateError) {
        console.error('Error al actualizar el perfil:', updateError.stack);
        res.status(500).json({ message: 'Error al actualizar el perfil' });
        return;
      }

      res.json({ message: 'Evento actualizado exitosamente' });
    });
  });
};

module.exports = { updateEvent };