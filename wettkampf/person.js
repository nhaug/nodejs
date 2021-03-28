// person.js

class Person {
  constructor(dao) {
    this.dao = dao;
    this.table = 'persons';
  }

  async createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS ${this.table} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      geschlecht TEXT
    )`;
    return this.dao.run(sql);
  }

  async create(lastName, firstName, geschlecht) {
    // console.log(lastName, firstName, geschlecht);
    const sql = `
      INSERT INTO ${this.table}
      (lastName, firstName, geschlecht)
      VALUES (?,?,?)
    `;
    return this.dao.run(sql, [lastName, firstName, geschlecht]);
  }

  /*
    Gibt die Person zu Vor und Nachname aus
    returns (person)
  */
  async getByName(lastName, firstName) {
    return this.dao.get(
      `SELECT * FROM ${this.table}
        WHERE lastName = ? AND firstName = ?`, [lastName, firstName],
    );
  }

  async getAllByField(field, value) {
    const all = await this.getAll();
    return all.filter((data) => data.field === value);
  }

  /*
    Gibt die Person zu Vor und Nachname aus
    returns (person)
  */
  async getAll() {
    return this.dao.all(
      `SELECT * FROM ${this.table}`,
    );
  }
}

module.exports = Person;
