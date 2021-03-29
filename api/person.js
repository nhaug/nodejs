// person.js

/**
 *
 */
class Person {
  /**
   * Creates Instace of class
   * @param {*} dao
   */
  constructor(dao) {
    this.dao = dao;
    this.table = 'persons';
  }

  /**
   * Table Created
   * @return {*} Table Created
   */
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

  /**
   * Erstellt eine Person mit den notwendigen Daten
   * @param {*} lastName
   * @param {*} firstName
   * @param {*} geschlecht
   * @return {String} PersonId
   */
  async create(lastName, firstName, geschlecht) {
    // console.log(lastName, firstName, geschlecht);
    const sql = `
      INSERT INTO ${this.table}
      (lastName, firstName, geschlecht)
      VALUES (?,?,?)
    `;
    return this.dao.run(sql, [lastName, firstName, geschlecht]);
  }


  /**
  * Gibt die Person zu Vor und Nachname aus
  * @param {String} lastName
  * @param {String} firstName
  * @return {JSOn} All Persons
  */
  async getByName(lastName, firstName) {
    return this.dao.get(
        `SELECT * FROM ${this.table}
        WHERE lastName = ? AND firstName = ?`, [lastName, firstName],
    );
  }

  /**
   *
   * @param {*} field
   * @param {*} value
   * @return {JSON} Alle Datensätze
   */
  async getAllByField(field, value) {
    const all = await this.getAll();
    return all.filter((data) => data.field === value);
  }

  /**
   * Gibt die Person zu Vor und Nachname aus
   * @return {JSON} Gibt die Person zu Vor und Nachname aus
   */
  async getAll() {
    return this.dao.all(
        `SELECT * FROM ${this.table}`,
    );
  }
}

module.exports = Person;
