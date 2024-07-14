const pool = require('../config/db');

const getEventsStudent = (req, res) => {
  const specialty = req.params.specialty;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (eventos alumno)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (eventos alumno)" });
      return;
    }

    const query = 'SELECT * FROM Eventos WHERE EspecialidadID = ? ';

    connection.query(query, specialty, (error, results) => {
      connection.release();

      if (error) {
        console.error("Error en la consulta a la base de datos (eventos alumno)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (eventos alumno)" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "No existe ningún evento con ese identificador" });
        return;
      }

      res.json(results);
    });
  });
};

module.exports = { getEventsStudent };