const pool = require('../config/db');

const getStudent = (req, res) => {
  const studentId = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (perfil estudiante)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (perfil estudiante)" });
      return;
    }

    const query = `
      SELECT 
        a.Nombre, a.Periodo, e.Especialidad 
      FROM 
        SpeedMentoring_Alumno a 
      JOIN 
        Especialidad e 
      ON 
        a.EspecialidadID = e.EspecialidadID 
      WHERE 
        a.alumnoid = ?`;

    connection.query(query, [studentId], (error, results) => {
      if (error) {
        console.error("Error en la consulta a la base de datos (perfil estudiante)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (perfil estudiante)" });
        connection.release();
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "No existe ningún alumno con ese identificador" });
        connection.release();
        return;
      }

      let response = results[0];

      const newQuery = 'SELECT Especialidad FROM Especialidad';

      connection.query(newQuery, (error, specialtyResults) => {
        connection.release();

        if (error) {
          console.error("Error en la consulta a la base de datos (especialidades)", error);
          res.status(500).json({ message: "Error en la consulta a la base de datos (especialidades)" });
          return;
        }

        response.especialidades = specialtyResults;

        res.json(response);
      });
    });
  });
};

const updateStudent = (req, res) => {
  const studentId = req.params.id;
  const { especialidad } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (perfil estudiante)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (perfil estudiante)" });
      return;
    }

    const query = `
      UPDATE 
        SpeedMentoring_Alumno 
      SET 
        EspecialidadID = (SELECT EspecialidadID FROM Especialidad WHERE Especialidad = ? ) 
      WHERE 
        AlumnoID = ?`;

    connection.query(query, [especialidad, studentId], (error, results) => {
      connection.release();

      if (error) {
        console.error("Error en la consulta a la base de datos (perfil estudiante)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (perfil estudiante)" });
        return;
      }

      res.json({ message: 'Perfil actualizado exitosamente' });
    });
  });
};

module.exports = { getStudent, updateStudent };