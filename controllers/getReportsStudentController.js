const pool = require('../config/db');

// Función para obtener detalles de una sesión y, si existe, el reporte asociado
const getReportBySesionId = (req, res) => {
  const { sesionId } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const query = `
      SELECT s.fecha, CONCAT (m.nombre, ' ', m.apellidopaterno, ' ', m.apellidomaterno) AS nombre, s.evaluacionhaciamentor AS calificacion, r.textoexplicativo AS texto        
      FROM speedmentoring_sesionesmentoria s 
      JOIN speedmentoring_mentor m 
      ON s.mentorrfc = m.mentorrfc        
      LEFT JOIN speedmentoring_reportes r 
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

        res.json({ success: true, data: results[0] });
      }
    });
  });
};

// Función para crear o actualizar un reporte
const setReportBySesionId = (req, res) => {
  const { sesionId } = req.params;
  const { texto, calificacion, fecha } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    // Primero, intentamos actualizar un reporte existente
    const updateQuery = `
      UPDATE speedmentoring_reportes
      SET textoexplicativo = ?
      WHERE sesionid = ?
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
        const insertQuery = `
          INSERT INTO speedmentoring_reportes (sesionid, fecha, textoexplicativo)
          VALUES (?, ?, ?)
        `;

        connection.query(insertQuery, [sesionId, fecha, texto], (insertError, insertResults) => {
          if (insertError) {
            connection.release();
            console.error('Error al insertar el reporte:', insertError.stack);
            res.status(500).json({ message: 'Error al insertar el reporte' });
            return;
          }

          const updateSesionQuery = `
            UPDATE speedmentoring_sesionesmentoria
            SET evaluacionhaciamentor = ?
            WHERE sesionid = ?
          `;

          connection.query(updateSesionQuery, [calificacion, sesionId], (updateSesionError, updateSesionResults) => {
            connection.release();
            if (updateSesionError) {
              console.error('Error al actualizar la sesión:', updateSesionError.stack);
              res.status(500).json({ message: 'Error al actualizar la sesión' });
              return;
            }

            res.json({ success: true, message: 'Reporte creado y sesión actualizada' });
          });
        });

      } else {
        const updateSesionQuery = `
          UPDATE speedmentoring_sesionesmentoria
          SET evaluacionhaciamentor = ?
          WHERE sesionid = ?
        `;

        connection.query(updateSesionQuery, [calificacion, sesionId], (updateSesionError, updateSesionResults) => {
          connection.release();
          if (updateSesionError) {
            console.error('Error al actualizar la sesión:', updateSesionError.stack);
            res.status(500).json({ message: 'Error al actualizar la sesión' });
            return;
          }

          res.json({ success: true, message: 'Reporte actualizado y sesión actualizada' });
        });
        
      }
    });
  });
};

module.exports = { getReportBySesionId, setReportBySesionId };