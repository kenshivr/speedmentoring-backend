const pool = require('../config/db'); // Asegúrate de que la ruta al archivo de configuración de la base de datos sea correcta

// Endpoint para obtener el perfil del estudiante
const getStudent = (req, res) => {
  const studentId = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (perfil estudiante)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (perfil estudiante)" });
      return;
    }

    const query = 'SELECT nombre, periodo, especialidad FROM speedmentoring_alumno WHERE alumnoid = ?';

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

// Función para actualizar la especialidad del estudiante
const updateStudentEspecialidad = (req, res) => {
  const studentId = req.params.id;
  const { especialidad } = req.body;

  const query = 'UPDATE speedmentoring_alumno SET especialidad = ? WHERE alumnoid = ?';

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (actualización de especialidad)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (actualización de especialidad)" });
      return;
    }

    connection.query(query, [especialidad, studentId], (error, results) => {
      connection.release();

      if (error) {
        console.error("Error al actualizar la especialidad del estudiante en la base de datos", error);
        res.status(500).json({ message: "Error al actualizar la especialidad del estudiante en la base de datos" });
        return;
      }

      res.json({ message: "Especialidad actualizada correctamente" });
    });
  });
};

module.exports = {
  getStudent,
  updateStudentEspecialidad
};