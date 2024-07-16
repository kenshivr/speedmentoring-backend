import { getConnection } from '../config/db';

const getReportBySesionId = (req, res) => {
  const { sesionId } = req.params;

  console.log('Aqui mostramos el sesionId en el backend');
  console.log(sesionId);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const query = `
      SELECT s.fecha, CONCAT (m.nombre, ' ', m.apellidopaterno, ' ', m.apellidomaterno) AS nombre, r.TextoExplicativo AS texto        
	    FROM SpeedMentoring_SesionesMentoria s 
	    JOIN SpeedMentoring_Mentor m 
	    ON s.mentorrfc = m.mentorrfc        
	    LEFT JOIN SpeedMentoring_Reportes r 
	    ON s.sesionid = r.sesionid 
	    WHERE s.sesionid = ? ;
    `;

    connection.query(query, [sesionId], (error, results) => {
      connection.release();

      if (error) {
        console.error('Error al obtener detalles de la sesión:', error.stack);
        res.status(500).json({ message: 'Error al obtener detalles de la sesión' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: 'Sesión no encontradaaa' });
      } else {

        console.log(results[0]);
        res.json({ success: true, data: results[0] });
      }
    });
  });
};

const setReportBySesionId = (req, res) => {
  const { sesionId } = req.params;
  const { texto, fecha } = req.body;

  console.log('Aqui mostramos el sesionId en setReportBySesionId', sesionId);
  console.log('Aqui mostramos el texto en setReportBySesionId', texto);
  console.log('Aqui mostramos el fecha en setReportBySesionId', fecha);

  getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    // Primero, intentamos actualizar un reporte existente
    const updateQuery = `
      UPDATE SpeedMentoring_Reportes 
      SET TextoExplicativo = ? 
      WHERE sesionid = ? ;
    `;

    connection.query(updateQuery, [texto, sesionId], (updateError, updateResults) => {
      if (updateError) {
        connection.release();
        console.error('Error al actualizar el reporte:', updateError.stack);
        res.status(500).json({ message: 'Error al actualizar el reporte' });
        return;
      }

      if (updateResults.affectedRows === 0) {
        // Si no se encontró un reporte para actualizar, creamos uno nuevo
        
        // Consulta para obtener el último reporteid
        const getLastReportIdQuery = `
          SELECT reporteid FROM SpeedMentoring_Reportes
          ORDER BY reporteid DESC
          LIMIT 1;
        `;
        
        connection.query(getLastReportIdQuery, (getLastReportIdError, getLastReportIdResults) => {
          if (getLastReportIdError) {
            connection.release();
            console.error('Error al obtener el último reporteid:', getLastReportIdError.stack);
            res.status(500).json({ message: 'Error al obtener el último reporteid' });
            return;
          }

          let lastReportId = 1; // Valor inicial por defecto si no hay registros previos

          if (getLastReportIdResults.length > 0) {
            lastReportId = getLastReportIdResults[0].reporteid;
          }

          // Incrementar lastReportId para obtener el siguiente reporteid
          const newReportId = lastReportId + 1;

          // Query para insertar un nuevo reporte con el nuevo reporteid
          const insertQuery = `
            INSERT INTO SpeedMentoring_Reportes (SesionID, Fecha, TextoExplicativo, reporteid)
            VALUES (?, ?, ?, ?);
          `;

          connection.query(insertQuery, [sesionId, fecha, texto, newReportId], (insertError, insertResults) => {
            connection.release();
            if (insertError) {
              console.error('Error al insertar el reporte:', insertError.stack);
              res.status(500).json({ message: 'Error al insertar el reporte' });
              return;
            }

            res.status(200).json({ success: true, message: 'Nuevo reporte creado exitosamente', newReportId });
          });
        });

      } else {
        res.json({ success: true, message: 'Reporte actualizado exitosamente' });
      }

    });

  });
};

export default { getReportBySesionId, setReportBySesionId };