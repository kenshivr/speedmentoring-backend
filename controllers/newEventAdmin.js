const pool = require('../config/db'); // Conexión a la base de datos

// Endpoint para agregar un nuevo evento
const newEventAdmin = (req, res) => {
  const { eventName, specialty, description, date, link } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const selectQuery = `
      SELECT 
        EventoID 
      FROM 
        Eventos 
      ORDER BY 
        EventoID DESC 
      LIMIT 1;
    `;

    connection.query(selectQuery, (selectError, results) => {
      if (selectError) {
        connection.release();
        console.error('Error al obtener el último EventoID:', selectError.stack);
        res.status(500).json({ message: 'Error al obtener el último EventoID' });
        return;
      }
      
      const lastId = results.length > 0 ? results[0].EventoID : 0;
      const newId = lastId + 1;

      const insertQuery = `
        INSERT INTO 
          Eventos (EventoID, EspecialidadID, Nombre, Descripción, Fecha, Link) 
        VALUES 
          ( ? ,     
          (SELECT EspecialidadID FROM Especialidad WHERE Especialidad = ? ),
          ?, ?, ?, ?)
      `;

      connection.query(insertQuery, [newId, specialty, eventName, description, date, link], (insertError, insertResults) => {
        connection.release();

        if (insertError) {
          console.error('Error al insertar el nuevo evento:', insertError.stack);
          res.status(500).json({ message: 'Error al insertar el nuevo evento' });
          return;
        }

        res.json({ message: 'Evento agregado exitosamente' });
      });
    });
  });
};

module.exports = { newEventAdmin };