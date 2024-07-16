const pool = require('../config/db');

const getStudent = (req, res) => {
  const studentId = req.params.id;

  getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (perfil estudiante)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (perfil estudiante)" });
      return;
    }

    const query = 'SELECT a.Nombre, a.Periodo, e.Especialidad FROM SpeedMentoring_Alumno a JOIN Especialidad e ON a.EspecialidadID = e.EspecialidadID WHERE a.alumnoid = ? ';

    connection.query(query, studentId, (error, results) => {
      connection.release();

      if (error) {
        console.error("Error en la consulta a la base de datos (perfil estudiante)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (perfil estudiante)" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "No existe ningún alumno con ese identificador" });
        return;
      }

      res.json(results[0]);
    });
  });
};

module.exports = { getStudent };
