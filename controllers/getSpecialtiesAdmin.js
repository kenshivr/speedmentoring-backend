const pool = require('../config/db');

const getEspecialties = (req, res) => {

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (eventos)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (eventos)" });
      return;
    }

    const query = 'SELECT Especialidad FROM Especialidad';

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.error("Error en la consulta a la base de datos (eventos)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (eventos)" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "No existe ningún evento" });
        return;
      }

      res.json(results);
    });
  });
};

const getEspecialidad = (req, res) => {
  const EspecialidadID = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos (eventos)", err.stack);
      res.status(500).json({ message: "Error en la conexión a la base de datos (eventos)" });
      return;
    }

    const query = 'SELECT Especialidad FROM Especialidad WHERE EspecialidadID = ?';

    connection.query(query, EspecialidadID, (error, results) => {
      connection.release();

      if (error) {
        console.error("Error en la consulta a la base de datos (especialidad)", error);
        res.status(500).json({ message: "Error en la consulta a la base de datos (especialidad)" });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: "No existe ningúna especialidad con este nombre" });
        return;
      }

      res.json(results[0]);
    });
  });
};

const updateEspecialidad = (req, res) => {
  const EspecialidadID = req.params.id;
  const { Especialidad } = req.body;

  // Verificar que se ha proporcionado un nuevo nombre de especialidad
  if (!Especialidad) {
    return res.status(400).json({ message: "El nombre de la especialidad es requerido" });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos", err.stack);
      return res.status(500).json({ message: "Error en la conexión a la base de datos" });
    }

    const query = 'UPDATE Especialidad SET Especialidad = ? WHERE EspecialidadID = ?';

    connection.query(query, [Especialidad, EspecialidadID], (error, results) => {
      connection.release();

      if (error) {
        console.error("Error en la consulta a la base de datos", error);
        return res.status(500).json({ message: "Error en la consulta a la base de datos" });
      }

      // Verificar si se actualizó alguna fila
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "No existe ninguna especialidad con este ID" });
      }

      // Enviar una respuesta de éxito
      res.json({ success: true, message: "Especialidad actualizada correctamente" });
    });
  });
};

const createEspecialidad = (req, res) => {
  const { Especialidad } = req.body;

  // Verificar que se ha proporcionado un nuevo nombre de especialidad
  if (!Especialidad) {
    return res.status(400).json({ message: "El nombre de la especialidad es requerido" });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión a la base de datos", err.stack);
      return res.status(500).json({ message: "Error en la conexión a la base de datos" });
    }

    // Obtener el próximo EspecialidadID disponible
    const getMaxIDQuery = 'SELECT IFNULL(MAX(EspecialidadID), 0) AS maxID FROM Especialidad';

    connection.query(getMaxIDQuery, (error, results) => {
      if (error) {
        connection.release();
        console.error("Error al obtener el máximo ID", error);
        return res.status(500).json({ message: "Error al obtener el máximo ID" });
      }

      // Obtener el próximo ID
      const maxID = results[0].maxID;
      const newEspecialidadID = maxID + 1;

      // Insertar la nueva especialidad con el nuevo EspecialidadID
      const insertQuery = 'INSERT INTO Especialidad (EspecialidadID, Especialidad) VALUES (?, ?)';

      connection.query(insertQuery, [newEspecialidadID, Especialidad], (error, results) => {
        connection.release();

        if (error) {
          console.error("Error en la consulta a la base de datos", error);
          return res.status(500).json({ message: "Error en la consulta a la base de datos" });
        }

        // Enviar una respuesta de éxito
        res.json({ success: true, message: "Especialidad creada correctamente" });
      });
    });
  });
};

module.exports = { getEspecialties, getEspecialidad, updateEspecialidad, createEspecialidad };