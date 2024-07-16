import getConnection from '../config/db.js';

export const login = (req, res) => {
  const { user, password } = req.body;

  getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexion a la base de datos' });
      return;
    }

    const queryAlumno = 'SELECT * FROM SpeedMentoring_Alumno WHERE alumnoid = ?';
    connection.query(queryAlumno, [user], (error, results) => {

      if (error) {
        console.error('Error en la consulta de inicio de sesión (alumno):', error.stack);
        res.status(500).json({ message: 'Error en la consulta de inicio de sesión (alumno)' });
        connection.release();
        return;
      }

      if (results.length === 0) {
        // Si no se encuentra al alumno, buscar en la tabla de mentores
        const queryMentor = 'SELECT * FROM SpeedMentoring_Mentor WHERE mentorrfc = ?';
        connection.query(queryMentor, [user], (error, results) => {
          if (error) {
            console.error('Error en la consulta de inicio de sesión (mentor):', error.stack);
            res.status(500).json({ message: 'Error en la consulta de inicio de sesión (mentor)' });
            connection.release();
            return;
          }

          if (results.length === 0) {
            res.status(401).json({ message: 'Mentor no encontrado' });
          } else {
            const mentor = results[0];

            if (password === mentor.HASH) {
              res.json({ success: true, userType: 'mentor', userId: mentor.MentorRFC, specialty: mentor.EspecialidadID , message: 'Inicio de sesión exitoso' });
            } else {
              res.status(401).json({ message: 'Contraseña incorrecta' });
            }
          }

          connection.release();
        });
      } else {
        const alumno = results[0];

        if (password === alumno.Password) {
          res.json({ success: true, userType: 'student', userId: alumno.AlumnoID, specialty: alumno.EspecialidadID , message: 'Inicio de sesión exitoso' });
        } else {
          res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        connection.release();
      }
    });
  });
};
