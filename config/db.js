const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'vidal',
  password: '123',
  database: 'speedmentoring2'
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a la base de datos MySQL:', err.stack);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
  connection.release();
});

module.exports = pool;