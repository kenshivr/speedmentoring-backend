import { getConnection } from '../config/db'; // Conexión a la base de datos

// Endpoint para obtener todas las especialidades
const getSpecialties = (req, res) => {
  getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos" });
      return;
    }

    const query = 'SELECT especialidad FROM speedmentoring_mentor';

    connection.query(query, (error, results) => {
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

export default { getSpecialties };