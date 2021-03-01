// person.js

class Person {
  constructor(dao) {
    this.dao = dao
    this.table = 'persons'
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS ${this.table} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      geschlecht TEXT
    )`;
    return this.dao.run(sql)
  }

  create(lastName, firstName, geschlecht) {
    //console.log(lastName, firstName, geschlecht);
    const sql = `
      INSERT INTO ${this.table}
      (lastName, firstName, geschlecht)
      VALUES (?,?,?)
    `
    return this.dao.run(sql,[lastName,firstName,geschlecht])
  }

  /*
    Gibt die Person zu Vor und Nachname aus
    returns (person)
  */
  getByName(lastName, firstName) {
      return this.dao.get(
        `SELECT * FROM ${this.table}
        WHERE lastName = ? AND firstName = ?`,[lastName, firstName]);
  }
}

module.exports = Person;
