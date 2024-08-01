const pool = require('../config/db');

const getSesionesWithMentorAndReport = (req, res) => {
  const studentId = req.params.id;

  const query = `
    SELECT 
      s.SesionID,
      s.Fecha, 
      s.Periodo,
      m.Nombre AS MentorNombre, 
      COALESCE(r.ReporteID, 'Sin reporte') AS ReporteID,
      COALESCE(r.TextoExplicativo, 'Sin reporte') AS TextoExplicativo
    FROM Sesiones s
    LEFT JOIN Mentor m ON s.MentorRFC = m.RFC
    LEFT JOIN Reportes r ON s.SesionID = r.SesionID
    WHERE s.EstudianteID = ?;
  `;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos', err);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    connection.query(query, [studentId], (error, results) => {
      connection.release();

      if (error) {
        console.error('Error en la consulta', error);
        res.status(500).json({ message: 'Error en la consulta' });
        return;
      }

      if (results.length === 0) {
        res.json({ success: false, message: 'No se encontraron sesiones' });
        return;
      }

      console.log(results);
      res.json({ success: true, data: results });
    });
  });
};

module.exports = getSesionesWithMentorAndReport;
