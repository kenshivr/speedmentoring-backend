const pool = require('../config/db');

const getStudents = (req, res) => {

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (alumnos)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (alumnos)" });
      return;
    }

    const query = `
    SELECT 
      *
    FROM 
      SpeedMentoring_Alumno
    `

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.error("Error en la consulta a la base de datos (alumnos)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (alumnos)" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "No existe ningún alumno" });
        return;
      }

      res.json(results);
    });
  });
};

module.exports = { getStudents };