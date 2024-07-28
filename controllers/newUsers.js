const pool = require('../config/db'); // Asumiendo que 'db' es donde se encuentra la conexión a la base de datos

// Controlador para registrar un nuevo mentor
const registerMentor = async (req, res) => {
  const {
    MentorRFC,
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    Especialidad,
    Empresa,
    Puesto,
    GradoAcademico,
    Maestria,
    CorreoElectronico,
    NumeroTelefono,
    HASH,
    SALT,
    Estado
  } = req.body;

  try {
    const query = `
      INSERT INTO SpeedMentoring_Mentor (
        MentorRFC, Nombre, ApellidoPaterno, ApellidoMaterno,
        EspecialidadID, Empresa, Puesto, GradoAcademico, maestria,
        correoelectronico, numerotelefono, hash, salt, estado
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;

    const values = [MentorRFC, Nombre, ApellidoPaterno, ApellidoMaterno, Especialidad, Empresa, Puesto, GradoAcademico, Maestria, CorreoElectronico, NumeroTelefono, HASH, SALT, Estado];

    await pool.query(query, values);
    res.status(201).send('Mentor registrado exitosamente');
  } catch (error) {
    console.error('Error al registrar mentor:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Controlador para registrar un nuevo alumno
const registerAlumno = async (req, res) => {
  const {
    AlumnoID,
    Nombre,
    ApellidoPaterno,
    ApellidoMaterno,
    Periodo,
    Password,
    EspecialidadID,
    MentorRFC,
    CorreoElectronico,
    NumeroTelefono,
    Estado
  } = req.body;

  try {
    const query = `
      INSERT INTO SpeedMentoring_Alumno (
        alumnoid, nombre, apellidopaterno, apellidomaterno, periodo, 
        password, especialidadid, mentorrfc, correoelectronico, 
        numerotelefono, estado
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;

    const values = [AlumnoID, Nombre, ApellidoPaterno, ApellidoMaterno, Periodo, Password, EspecialidadID, MentorRFC, CorreoElectronico, NumeroTelefono, Estado];

    await pool.query(query, values);
    res.status(201).send('Alumno registrado exitosamente');
  } catch (error) {
    console.error('Error al registrar alumno:', error);
    res.status(500).send('Error interno del servidor');
  }
};

module.exports = {
  registerMentor,
  registerAlumno
};
