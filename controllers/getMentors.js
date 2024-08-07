const pool = require('../config/db');

const getMentors = (req, res) => {

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (mentores)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (mentores)" });
      return;
    }

    const query = `
    SELECT 
      *
    FROM 
      mentor
    `

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.error("Error en la consulta a la base de datos (mentores)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (mentores)" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "No existe ningún mentor" });
        return;
      }

      res.json(results);
    });
  });
};

module.exports = { getMentors };