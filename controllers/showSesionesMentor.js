const pool = require('../config/db'); // Asumiendo que `pool` es tu configuración de conexión a la base de datos

const showSesionesMentorController = (req, res) => {
  const mentorId = req.params.id; // Obtiene el id del mentor desde los parámetros de la URL

  // Consulta SQL para obtener las sesiones del mentor con su información
  const query = `
    SELECT 
      Sesiones.*,
      Estudiante.Nombre,
      Estudiante.ApellidoPaterno,
      Estudiante.ApellidoMaterno
    FROM 
      Sesiones
    JOIN 
      Estudiante ON Sesiones.EstudianteID = Estudiante.EstudianteID
    WHERE 
      Sesiones.MentorRFC = ?
  `;

  // Ejecutar la consulta usando el pool de conexiones
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos', err);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    connection.query(query, [mentorId], (error, results) => {
      connection.release(); // Liberar la conexión después de la consulta

      if (error) {
        console.error('Error en la consulta (mentor: sesiones)', error);
        res.status(500).json({ message: 'Error en la consulta (mentor: sesiones)' });
        return;
      }

      if (results.length === 0) {
        res.json({ success: false });
        return;
      }

      res.json({ success: true, data: results }); // Enviar los resultados al frontend
    });
  });
};

module.exports = showSesionesMentorController;