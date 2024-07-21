const pool = require('../config/db');

const getEvent = (req, res) => {
  const eventId  = req.params.eventId;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (eventos)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (eventos)" });
      return;
    }

    const query = `
    SELECT 
      Eventos.*, Especialidad.Especialidad 
    FROM 
      Eventos 
    JOIN 
      Especialidad 
    ON 
      Eventos.EspecialidadID = Especialidad.EspecialidadID 
    WHERE 
      Eventos.EventoID = ?
    `

    connection.query(query, eventId, (error, results) => {
      connection.release();

      if (error) {
        console.error("Error en la consulta a la base de datos (eventos)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (eventos)" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "No existe ningún evento" });
        return;
      }

      res.json(results[0]);
    });
  });
};

module.exports = { getEvent };