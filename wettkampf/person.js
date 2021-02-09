// person.js

class Person {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS persons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      geschlecht TEXT
    )`;
    return this.dao.run(sql)
  }
}

module.exports = Person;
