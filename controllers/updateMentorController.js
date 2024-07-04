const pool = require('../config/db');

// Endpoint para obtener el perfil del usuario
const getUserProfile = (req, res) => {
  const { userId } = req.params;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const query = `
      SELECT numerotelefono, correoelectronico, empresa, puesto, especialidad
      FROM speedmentoring_mentor
      WHERE mentorrfc = ?
    `;

    connection.query(query, [userId], (error, results) => {
      connection.release();

      if (error) {
        console.error('Error al obtener el perfil:', error.stack);
        res.status(500).json({ message: 'Error al obtener el perfil' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: 'Perfil no encontrado' });
        return;
      }

      res.json(results[0]);

    });
  });
};

// Endpoint para actualizar el perfil del usuario
const updateProfile = (req, res) => {
  const { userId, phoneNumber, email, company, position, specialty } = req.body;

  // Validar formato de datos
  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ message: 'Número de teléfono no válido' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Correo electrónico no válido' });
  }

  // Actualizar base de datos
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const query = `
      UPDATE speedmentoring_mentor
      SET numerotelefono = ?, correoelectronico = ?, empresa = ?, puesto = ?, especialidad = ?
      WHERE mentorrfc = ?
    `;

    connection.query(query, [phoneNumber, email, company, position, specialty, userId], (error, results) => {
      connection.release();
      
      if (error) {
        console.error('Error al actualizar el perfil:', error.stack);
        res.status(500).json({ message: 'Error al actualizar el perfil' });
        return;
      }

      res.json({ message: 'Perfil actualizado correctamente' });
    });
  });
};

module.exports = { getUserProfile, updateProfile };