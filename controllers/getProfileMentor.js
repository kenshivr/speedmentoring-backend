const pool = require('../config/db');

const getProfileMentor = (req, res) => {
  const mentorID = req.params.id;

  let response = {};

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (perfil mentor)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (perfil mentor)" });
      return;
    }

    const query = `
      SELECT    
        m.MentorRFC, m.Nombre, m.ApellidoPaterno, m.ApellidoMaterno, m.NumeroTelefono, m.CorreoElectronico, m.Empresa, m.Puesto, m.GradoAcademico, e.Especialidad 
      FROM    
        SpeedMentoring_Mentor m 
      JOIN    
        Especialidad e 
      ON 
        m.EspecialidadID = e.EspecialidadID 
      WHERE   
        m.MentorRFC = ?
    `

    connection.query(query, [mentorID], (error, mentorResults) => {
      if (error) {
        connection.release();
        console.error("Error en la consulta a la base de datos (perfil mentor)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (perfil mentor)" });
        return;
      }

      if (mentorResults.length === 0) {
        connection.release();
        res.status(404).json({ message: "No existe ningún mentor con ese identificador" });
        return;
      }

      response = mentorResults[0];

      const newQuery = 'SELECT Especialidad FROM Especialidad';

      connection.query(newQuery, (error, specialtyResults) => {
        connection.release();
  
        if (error) {
          console.error("Error en la consulta a la base de datos (especialidades)", error);
          res.status(500).json({ message: "Error en la consulta a la base de datos (especialidades)" });
          return;
        }
  
        response.especialidades = specialtyResults;

        res.json(response);
      });
    });
  });
};

module.exports = { getProfileMentor };
