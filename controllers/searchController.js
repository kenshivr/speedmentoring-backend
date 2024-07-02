const pool = require('../config/db');
const { sendEmail } = require('../services/emailService');

const searchEmail = (req, res) => {
  const { email } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión:', err.stack);
      res.status(500).json({ message: 'Error en el servidor' });
      return;
    }

    const query = 'SELECT * FROM speedmentoring_alumno WHERE correo = ?';
    connection.query(query, [email], (error, results, fields) => {
      if (error) {
        console.error('Error en la consulta:', error.stack);
        res.status(500).json({ message: 'Error en el servidor' });
        return;
      }

      if (results.length === 0) {
        console.log('No existe el correo en la base de datos');
        res.json({ success: false });
      } else {
        const nuevaContraseña = 'nuevaContraseña123';
        const mailOptions = {
          from: 'mentoringspeed@gmail.com',
          to: email,
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
            res.status(500).json({ message: 'Error en el servidor' });
          });
      }

      connection.release();
    });
  });
};

module.exports = { searchEmail };