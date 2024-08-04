const pool = require('../config/db');

const getSesion = (req, res) => {
  const sesionId = req.params.sesionId;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (sesion mentor)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (sesion mentor)" });
      return;
    }

    const query = `
        SELECT     
            e.EstudianteID, e.Nombre, e.ApellidoPaterno, e.ApellidoMaterno, e.Periodo, s.Fecha 
        FROM     
            Sesiones s    
        JOIN 
            Estudiante e 
        ON 
            s.EstudianteID = e.EstudianteID 
        WHERE     
            s.SesionID = ? 
    `;

    connection.query(query, [sesionId], (error, results) => {
      if (error) {
        console.error("Error en la consulta a la base de datos (sesion mentor)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (sesion mentor)" });
        connection.release();
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "No existe ningúna sesion con ese identificador" });
        connection.release();
        return;
      }

      res.json(results[0]);
    });
  });
};

const updateSesion = (req, res) => {
  const sesionId = req.params.sesionId;
  const { date } = req.body;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (sesion mentor)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (sesion mentor)" });
      return;
    }

    const query = `
      UPDATE 
        Sesiones 
      SET 
        Fecha=? 
      WHERE 
        SesionID=?
    `;

    connection.query(query, [date, sesionId], (error, results) => {
      connection.release();

      if (error) {
        console.error("Error en la consulta a la base de datos (sesion mentor)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (sesion mentor)" });
        return;
      }

      res.json({ message: 'Sesion actualizada exitosamente' });
    });
  });
};

module.exports = { getSesion, updateSesion };