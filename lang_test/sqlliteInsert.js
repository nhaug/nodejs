const sqlite3 = require('sqlite3').verbose();

try {
  // Create new file-based DB
  let db = new sqlite3.Database('./db/test.db', (err) => {
    if (err) {
      console.error(err.message+err.stack);
    }
    console.log('Connected to the test database.');
  });

  db.run('CREATE TABLE langs(name text)');

  db.close((err) => {
    if (err) {
        console.error(err.message + errs.stack);
    }
  })

  // Einfügen:
  // db.run (sql, params, function (err) {}))
  db = new sqlite3.Database('./db/test.db');
  let sql = `INSERT INTO langs(name) VALUES(?)`;
  db.run(sql,['C'], (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("A row has been inserted: %s",);
  })

} catch (e) {
  console.error("Fehler"+e + e.stack);
}
