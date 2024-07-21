const pool = require('../config/db'); 

const showSesionesStudentController = (req, res) => {
  const studentId = req.params.id; 

  const query = `
    SELECT s.fecha, r.reporteid, s.sesionid, 
    CONCAT(m.nombre, ' ', m.apellidopaterno, ' ', m.apellidomaterno) AS nombre
    FROM SpeedMentoring_SesionesMentoria s
    INNER JOIN SpeedMentoring_Alumno a ON s.alumnoid = a.alumnoid
    LEFT JOIN SpeedMentoring_Reportes r ON s.sesionid = r.sesionid
    INNER JOIN SpeedMentoring_Mentor m ON s.mentorrfc = m.mentorrfc
    WHERE a.alumnoid = ? ;
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
        console.error('Error en la consulta (estudiante: sesiones)', error);
        res.status(500).json({ message: 'Error en la consulta (estudiante: sesiones)' });
        return;
      }

      if (results.length === 0) {
        res.json({ success: false });
        return;
      }

      res.json({ success: true, data: results });
    });
  });
};

module.exports = showSesionesStudentController;