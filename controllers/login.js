const pool = require('../config/db');

const login = (req, res) => {
  const { user, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    // Consulta en la tabla de alumnos
    const queryAlumno = 'SELECT * FROM Estudiante WHERE EstudianteID = ?';
    connection.query(queryAlumno, [user], (error, results) => {
      if (error) {
        console.error('Error en la consulta de inicio de sesión (alumno):', error.stack);
        res.status(500).json({ message: 'Error en la consulta de inicio de sesión (alumno)' });
        connection.release();
        return;
      }

      if (results.length === 0) {
        // Si no se encuentra al alumno, buscar en la tabla de mentores
        const queryMentor = 'SELECT * FROM Mentor WHERE RFC = ?';
        connection.query(queryMentor, [user], (error, results) => {
          if (error) {
            console.error('Error en la consulta de inicio de sesión (mentor):', error.stack);
            res.status(500).json({ message: 'Error en la consulta de inicio de sesión (mentor)' });
            connection.release();
            return;
          }

          if (results.length === 0) {
            // Si no se encuentra al mentor, buscar en la tabla de administradores
            const queryAdmin = 'SELECT * FROM Administrador WHERE AdminID = ?';
            connection.query(queryAdmin, [user], (error, results) => {
              if (error) {
                console.error('Error en la consulta de inicio de sesión (admin):', error.stack);
                res.status(500).json({ message: 'Error en la consulta de inicio de sesión (admin)' });
                connection.release();
                return;
              }

              if (results.length === 0) {
                res.status(401).json({ message: 'Usuario no encontrado' });
              } else {
                const admin = results[0];

                if (password === admin.Password) {
                  res.json({ success: true, userType: 'admin', userId: admin.AdminID, message: 'Inicio de sesión exitoso' });
                } else {
                  res.status(401).json({ message: 'Contraseña incorrecta' });
                }
              }

              connection.release();
            });
          } else {
            const mentor = results[0];

            if (password === mentor.PasswordHash) {
              res.json({ success: true, userType: 'mentor', userId: mentor.RFC, specialty: mentor.EspecialidadID, message: 'Inicio de sesión exitoso' });
            } else {
              res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            connection.release();
          }
        });
      } else {
        const alumno = results[0];

        if (password === alumno.PasswordHash) {
          res.json({ success: true, userType: 'student', userId: alumno.EstudianteID, specialty: alumno.EspecialidadID, message: 'Inicio de sesión exitoso' });
        } else {
          res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        connection.release();
      }
    });
  });
};

module.exports = { login };
