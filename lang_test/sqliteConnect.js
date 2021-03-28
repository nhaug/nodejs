const sqlite3 = require('sqlite3').verbose();

try {
  // open in-Memory DB
  let db = new sqlite3.Database(':memory:',(err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the in-memory SQLite Database");
  });

  // close DB
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the Database Connection");
  });

  // Create new file-based DB
  let dba = new sqlite3.Database('./test.db', (err) => {
    if (err) {
      console.error(err.message+err.stack);
    }
    console.log('Connected to the chinook database.');
  });

  dba.close((err) => {
    if (err) {
        console.error(err.message + errs.stack);
    }
  })

} catch (e) {
  console.error("Fehler"+e + e.stack);
}
