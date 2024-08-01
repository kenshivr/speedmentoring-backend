const pool = require('../config/db');

const getReportBySesionId = (req, res) => {
  const { sesionId } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const query = `
      SELECT s.Fecha AS fecha, CONCAT(m.Nombre, ' ', m.ApellidoPaterno, ' ', m.ApellidoMaterno) AS nombre, r.TextoExplicativo AS texto        
      FROM Sesiones s 
      JOIN Mentor m 
      ON s.MentorRFC = m.RFC        
      LEFT JOIN Reportes r 
      ON s.SesionID = r.SesionID 
      WHERE s.SesionID = ? ;
    `;

    connection.query(query, [sesionId], (error, results) => {
      connection.release();

      if (error) {
        console.error('Error al obtener detalles de la sesión:', error.stack);
        res.status(500).json({ message: 'Error al obtener detalles de la sesión' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: 'Sesión no encontrada' });
      } else {
        res.json({ success: true, data: results[0] });
      }
    });
  });
};

const setReportBySesionId = (req, res) => {
  const { sesionId } = req.params;
  const { texto, fecha } = req.body;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    // Primero, intentamos actualizar un reporte existente
    const updateQuery = `
      UPDATE Reportes 
      SET TextoExplicativo = ?, Fecha = ? 
      WHERE SesionID = ? ;
    `;

    connection.query(updateQuery, [texto, fecha, sesionId], (updateError, updateResults) => {
      if (updateError) {
        connection.release();
        console.error('Error al actualizar el reporte:', updateError.stack);
        res.status(500).json({ message: 'Error al actualizar el reporte' });
        return;
      }

      if (updateResults.affectedRows === 0) {
        // Si no se encontró un reporte para actualizar, creamos uno nuevo

        // Consulta para obtener el último ReporteID
        const getLastReportIdQuery = `
          SELECT ReporteID FROM Reportes
          ORDER BY ReporteID DESC
          LIMIT 1;
        `;
        
        connection.query(getLastReportIdQuery, (getLastReportIdError, getLastReportIdResults) => {
          if (getLastReportIdError) {
            connection.release();
            console.error('Error al obtener el último ReporteID:', getLastReportIdError.stack);
            res.status(500).json({ message: 'Error al obtener el último ReporteID' });
            return;
          }

          let lastReportId = 0; // Valor inicial por defecto si no hay registros previos

          if (getLastReportIdResults.length > 0) {
            lastReportId = getLastReportIdResults[0].ReporteID;
          }

          // Incrementar lastReportId para obtener el siguiente ReporteID
          const newReportId = lastReportId + 1;

          // Query para insertar un nuevo reporte con el nuevo ReporteID
          const insertQuery = `
            INSERT INTO Reportes (SesionID, Fecha, TextoExplicativo, ReporteID)
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

module.exports = { getReportBySesionId, setReportBySesionId };
