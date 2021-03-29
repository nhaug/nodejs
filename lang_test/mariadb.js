require('dotenv').config();
const mariadb = require('mariadb');
console.log(process.env.DB_HOST);
const pool = mariadb.createPool({host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'mysql',
  port: 3307,
  connectionLimit: 5});

/**
 * Async Function
 */
async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM user');
    console.log(rows);
    // rows: [ {val: 1}, meta: ... ]

    // const res = await conn.query
    // ('SELE INTO myTable value (?, ?)', [1, 'mariadb']);
    // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release(); // release to pool
  }
}

asyncFunction();
