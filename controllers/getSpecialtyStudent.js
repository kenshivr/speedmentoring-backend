const pool = require('../config/db'); // Conexión a la base de datos

// Endpoint para obtener todas las especialidades
const getSpecialty = (req, res) => {
  const { userId } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos" });
      return;
    }

    const query = `
    SELECT 
      EspecialidadID 
    FROM 
      SpeedMentoring_Alumno 
    WHERE 
      AlumnoID = ? 
    `;

    connection.query(query, [userId], (error, results) => {
      connection.release();

      if (error) {
        console.error("Error en la consulta a la base de datos", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos" });
        return;
      }

      if (results.length === 0) {
        res.status(400).json({ message: "No existen especialidades en la base de datos" });
        return;
      }

      res.json(results);
    });
  });
};

module.exports = { getSpecialty };