// run.js

class Run {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      distance REAL
      )`
    return this.dao.run(sql)
  }

  create(runObj) {
    return this.dao.run(
      'INSERT INTO runs (name, distance) VALUES (?, ?)',
      [runObj.name, runObj.distance])
  }

  getById(id) {
    return this.dao.get(
      'SELECT * FROM runs WHERE id = ?',
      [id])
  }
}

module.exports = Run;
