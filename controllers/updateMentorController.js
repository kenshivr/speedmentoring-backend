const pool = require('../config/db'); // Conexión a la base de datos

// Endpoint para obtener el perfil del mentor
const getUserProfile = (req, res) => {
  const { userId } = req.params; // El userId es el RFC del mentor para identificarlo

  pool.getConnection((err, connection) => {
    if (err) { // En caso de error en la base de datos
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const query = `
      SELECT nombre, apellidoPaterno, apellidoMaterno, rfc, numerotelefono, correoelectronico, empresa, puesto, especialidad, gradoAcademico, maestria
      FROM speedmentoring_mentor
      WHERE mentorrfc = ?
    `; // Query para obtener los datos que pueden ser actualizados por parte del mentor

    connection.query(query, [userId], (error, results) => { // se hace asi el query para evitar la inyeccion sql
      connection.release();

      if (error) { // Si hay un error en el query
        console.error('Error al obtener el perfil:', error.stack); 
        res.status(500).json({ message: 'Error al obtener el perfil' });
        return;
      }

      if (results.length === 0) { // Si no se encuentra ningun mentor con ese rfc
        res.status(404).json({ message: 'Perfil no encontrado' });
        return;
      }

      res.json(results[0]); // Se responden los datos del mentor a la solicitud get

    });
  });
};

// Endpoint para actualizar el perfil del usuario
const updateProfile = (req, res) => {
  const { userId, phoneNumber, email, company, position, specialty, academicDegree, hasMasters } = req.body; // Se deben enviar los datos del mentor a la peticion post

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
    if (err) { // En caso de error en la base de datos
      console.error('Error al obtener la conexión a la base de datos:', err.stack);
      res.status(500).json({ message: 'Error en la conexión a la base de datos' });
      return;
    }

    const query = `
      UPDATE speedmentoring_mentor
      SET numerotelefono = ?, correoelectronico = ?, empresa = ?, puesto = ?, especialidad = ?, gradoAcademico = ?, maestria = ?
      WHERE mentorrfc = ?
    `; // Query para obtener los datos que pueden ser actualizados por parte del mentor

    connection.query(query, [phoneNumber, email, company, position, specialty, academicDegree, hasMasters, userId], (error, results) => { // se hace asi el query para evitar la inyeccion sql
      connection.release();
      
      if (error) { // Si hay un error en el query
        console.error('Error al actualizar el perfil:', error.stack);
        res.status(500).json({ message: 'Error al actualizar el perfil' });
        return;
      }

      res.json({ message: 'Perfil actualizado correctamente' }); // Si el perfil se actualizo adecuadamente se retorna el mensaje de exito
    });
  });
};

module.exports = { getUserProfile, updateProfile };
