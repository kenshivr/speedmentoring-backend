const pool = require('../config/db');

const showSesionesMentorController = (req, res) => {
  const mentorId = req.params.id;

  console.log(mentorId);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos', err);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    console.log('Bandera 1');

    const query = 'SELECT s.fecha, a.nombre, r.reporteid ' +
                  'FROM speedmentoring_sesionesmentoria s ' +
                  'JOIN speedmentoring_alumno a ON s.alumnoid = a.alumnoid ' +
                  'LEFT JOIN speedmentoring_reportes r ON s.sesionid = r.sesionid ' +
                  'WHERE s.mentorrfc = ?';

    connection.query(query, [mentorId], (error, result) => {
      connection.release();

      if (error) {
        console.log('Bandera 2');
        console.error('Error en la consulta (mentor: sesiones)', error);
        res.status(500).json({ message: 'Error en la consulta (mentor: sesiones)' });
        return;
      }

      if (result.length === 0) {
        console.log('Bandera 3');
        res.json({ success: false });
        return;
      }

      console.log('Bandera 4');
      console.log(result);
      res.json({ success: true, data: result });
    });
  });
}

module.exports = showSesionesMentorController;