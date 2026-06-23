const pool = require('./db');

pool.query('SELECT NOW()')
  .then(res => {
    console.log('Connected! Server time:', res.rows[0].now);
    pool.end();
  })
  .catch(err => {
    console.error('Connection failed:', err.message);
    pool.end();
  });