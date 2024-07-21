const pool = require('../config/db');
const { sendEmail } = require('../services/emailService');

const searchEmail = (req, res) => {
  const { id } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error al obtener la conexión a la base de datos' });
      return;
    }

    const queryAlumno = 'SELECT * FROM SpeedMentoring_Alumno WHERE AlumnoID = ? ';
    connection.query(queryAlumno, [id], (error, resultsAlumno) => {
      if (error) {
        console.error('Error en la consulta (alumno):', error.stack);
        res.status(500).json({ message: 'Error en la consulta (alumno)' });
        connection.release();
        return;
      }

      if (resultsAlumno.length === 0) {
        // Si no se encuentra al alumno, buscar en la tabla de mentores
        const queryMentor = 'SELECT * FROM SpeedMentoring_Mentor WHERE MentorRFC = ?';
        connection.query(queryMentor, [id], (error, resultsMentor) => {
          if (error) {
            console.error('Error en la consulta (mentor):', error.stack);
            res.status(500).json({ message: 'Error en la consulta (mentor)' });
            connection.release();
            return;
          }

          if (resultsMentor.length === 0) {
            console.log('No existe el alumno ni el mentor en la base de datos');
            res.json({ success: false });
          } else {
            // const mentor = resultsMentor[0];
            const nuevaContraseña = 'nuevaContraseña123';
            const mailOptions = {
              from: 'mentoringspeed@gmail.com',
              to: 'mentoringspeed@gmail.com', // resultsMentor.CorreoElectronico
              subject: 'Recuperación de contraseña',
              text: `Tu nueva contraseña es: ${nuevaContraseña}`
            };

            sendEmail(mailOptions.to, mailOptions.subject, mailOptions.text)
              .then(info => {
                console.log('Correo enviado:', info.response);
                res.json({ success: true });
              })
              .catch(err => {
                console.error('Error al enviar el correo:', err);
                res.status(500).json({ message: 'Error al enviar el correo' });
              });
          }

          connection.release();
        });
      } else {
        // const alumno = resultsAlumno[0];
        const nuevaContraseña = 'nuevaContraseña123';
        const mailOptions = {
          from: 'mentoringspeed@gmail.com',
          to: 'mentoringspeed@gmail.com',// resultsAlumno.CorreoElectronico
          subject: 'Recuperación de contraseña',
          text: `Tu nueva contraseña es: ${nuevaContraseña}`
        };

        sendEmail(mailOptions.to, mailOptions.subject, mailOptions.text)
          .then(info => {
            console.log('Correo enviado:', info.response);
            res.json({ success: true });
          })
          .catch(err => {
            console.error('Error al enviar el correo:', err);
            res.status(500).json({ message: 'Error al enviar el correo' });
          });

        connection.release();
      }
    });
  });
};

module.exports = { searchEmail };