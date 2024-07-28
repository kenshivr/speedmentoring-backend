const fs = require('fs');
const csv = require('csv-parser');
const pool = require('../config/db'); // Conexión a la base de datos

const importUsers = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No se proporcionó ningún archivo.' });
  }

  const filePath = req.file.path;
  let isFirstRow = true; // Bandera para identificar la primera fila
  let tableName = ''; // Nombre de la tabla donde se insertarán los datos
  let errorMessage = ''; // Mensaje de error en caso de que ocurra

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', async (row) => {
      if (isFirstRow) {
        isFirstRow = false; // Marcar que ya se procesó la primera fila
        if (row.hasOwnProperty('AlumnoID')) {
          console.log('Estas registrando un Alumno');
          tableName = 'SpeedMentoring_Alumno';
        } else if (row.hasOwnProperty('MentorRFC')) {
          console.log('Estas registrando un Mentor');
          tableName = 'SpeedMentoring_Mentor';
        } else {
          console.log('Archivo no válido. No contiene AlumnoID ni MentorRFC.');
          errorMessage = 'Archivo no válido. No contiene AlumnoID ni MentorRFC.';
          return;
        }
      }

      try {
        if (tableName === 'SpeedMentoring_Alumno') {
          // Insertar datos en la tabla de alumnos
          await pool.query('INSERT INTO SpeedMentoring_Alumno SET ?', row);
        } else if (tableName === 'SpeedMentoring_Mentor') {
          // Insertar datos en la tabla de mentores
          await pool.query('INSERT INTO SpeedMentoring_Mentor SET ?', row);
        }
      } catch (error) {
        console.log(`Error al insertar datos en la tabla ${tableName}:`, error);
        errorMessage = `Error al insertar datos en la tabla ${tableName}: ${error.message}`;
      }
    })
    .on('end', () => {
      if (errorMessage) {
        res.status(500).json({ success: false, message: errorMessage });
      } else {
        console.log('Archivo CSV procesado con éxito.');
        res.json({ success: true, message: 'Archivo importado con éxito.' });
      }
      fs.unlinkSync(filePath);
    })
    .on('error', (error) => {
      console.error('Error al procesar el archivo:', error);
      res.status(500).json({ success: false, message: 'Error al procesar el archivo.' });
    });
};

module.exports = { importUsers };