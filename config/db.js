import mysql from 'mysql';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'vidal',
  password: '123',
  database: 'speedmentoring'
});

const getConnection = (callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error al conectar a la base de datos MySQL:', err.stack);
      callback(err, null);
      return;
    }
    console.log('Conexión a la base de datos MySQL establecida');
    callback(null, connection);
    connection.release();
  });
};

export default getConnection;
