const sqlite3 = require('sqlite3');

// Create new file-based DB
const db = new sqlite3.Database('./db/chinook.db', (err) => {
  if (err) {
    console.error(err.message + err.stack);
  }
  console.log('Connected to the chinook database.');
});

let sql = 'SELECT DISTINCT PlaylistId id, Name name FROM playlists ORDER BY id';

// Alle Reihen db.all()
// db.all(sql, params, (err, rows) => {
db.all(sql, [], (err, rows) => {
  // Verarbeite rows hier
  rows.forEach((row) => {
    console.log('%d | %s', row.id, row.name);
  });
});

// Einzelne Reihe: db.get()
listId = 1;
sql = `SELECT PlaylistId id, Name name
       FROM playlists
      WHERE PlaylistId = ?`;
db.get(sql, [listId], (err, row) => (row
  ? console.log('%d | %s', row.id, row.name)
  : console.log('No playlist found with the id %s', listId)));
// Besser Reihen nacheinander: db.each()
sql = `SELECT FirstName firstName,
                  LastName lastName,
                  Email email
            FROM customers
            WHERE Country = ?
            ORDER BY FirstName`;

db.each(sql, ['USA'], (err, row) => {
  if (err) {
    throw err;
  }
  // console.log(`${row.firstName} ${row.lastName} - ${row.email}`);
  console.log('%s %s - %s', row.firstName, row.lastName, row.email);
});

db.close((err) => {
  if (err) {
    console.error(err.message + errs.stack);
  }
});
