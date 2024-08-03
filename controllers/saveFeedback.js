const pool = require('../config/db');

const retro = (req, res) => {
    const { 
        p1, 
        p2, 
        p3, 
        p4, 
        p5, 
        p6, 
        p7, 
        p8, // Asumimos que p8 es un array de strings
        comentariosAdicionales, 
        userId
    } = req.body;

    // Convertir p1 a p7 de string a número
    const p1Int = parseInt(p1, 10);
    const p2Int = parseInt(p2, 10);
    const p3Int = parseInt(p3, 10);
    const p4Int = parseInt(p4, 10);
    const p5Int = parseInt(p5, 10);
    const p6Int = parseInt(p6, 10);
    const p7Int = parseInt(p7, 10);
    const userIdInt = parseInt(userId, 10);

    // Unir los elementos de p8 en una cadena separada por comas, si p8 es un array
    const p8Joined = Array.isArray(p8) ? p8.join(',') : p8;

    pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error al obtener la conexión a la base de datos:', err.stack);
          res.status(500).json({ message: 'Error en la conexión a la base de datos' });
          return;
        }

        // Asegúrate de que el número de parámetros en VALUES coincida con los de la consulta SQL
        const queryRetro = `
            INSERT INTO FeedbackEstudiante (
                FeedbackEstudianteID,
                CalificacionGeneral_P1,
                ComunicacionyClaridad_P1,
                ComunicacionyClaridad_P2,
                ApoyoyRecursos_P1,
                ApoyoyRecursos_P2,
                PuntualidadyOrganizacion_P1,
                PuntualidadyOrganizacion_P2,
                FortalezasyAreasDeMejora_P1,
                FortalezasyAreasDeMejora_P2,
                ComentariosAdicionales
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(queryRetro, [userIdInt, p1Int, p2Int, p3Int, p4Int, p5Int, p6Int, p6Int, p6Int, p8Joined, comentariosAdicionales], (error, results) => {
          if (error) {
            console.error('Error en la inserción de feedback (estudiante):', error.stack);
            res.status(500).json({ message: 'Error en el feedback (estudiante)' });
          } else {
            // Ejemplo de respuesta exitosa
            res.status(201).json({ message: 'Retroalimentación recibida exitosamente', success: true });
          }
          connection.release(); // Asegúrate de liberar la conexión
        });
    });
};

module.exports = { retro };
