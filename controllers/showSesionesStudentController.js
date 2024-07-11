const pool = require('../config/db'); // Asumiendo que `pool` es tu configuración de conexión a la base de datos

const showSesionesStudentController = (req, res) => {
  const studentId = req.params.id; // Obtiene el id del mentor desde los parámetros de la URL

  // Consulta SQL para obtener las sesiones del mentor con su información
  const query = `
    SELECT s.fecha, a.nombre, r.reporteid, s.sesionid 
    FROM speedmentoring_sesionesmentoria s
    INNER JOIN speedmentoring_alumno a ON s.alumnoid = a.alumnoid
    LEFT JOIN speedmentoring_reportes r ON s.sesionid = r.sesionid
    WHERE a.alumnoid = ? ;
  `;

  // Ejecutar la consulta usando el pool de conexiones
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos', err);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    connection.query(query, [studentId], (error, results) => {
      connection.release(); // Liberar la conexión después de la consulta

      if (error) {
        console.error('Error en la consulta (estudiante: sesiones)', error);
        res.status(500).json({ message: 'Error en la consulta (estudiante: sesiones)' });
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

module.exports = showSesionesStudentController;