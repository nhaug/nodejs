// run.js

class Challenge {
  constructor(dao) {
    this.dao = dao
    this.table = "challenges"
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS ${this.table} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT type UNIQUE,
      distance REAL
      )`
    return this.dao.run(sql)
  }

  create(challenge) {
    //this.getByField('name',challenge.name)
    // Hier weiter!!!
    //  .data((data => ));
    return this.dao.run(
      `INSERT OR IGNORE INTO ${this.table} (name, distance) VALUES (?, ?)`,
      [challenge.name, challenge.distance])
  }

  getByField(field,value) {
    return this.dao.get(
      `SELECT * FROM ${this.table} WHERE ${field} = "${value}"`,)
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id])
  }
}

module.exports = Challenge;
