// result.js

class Result {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      zeit REAL,
      pace REAL,
      runId INTEGER,
      personId INTEGER,
      CONSTRAINT results_fk_runId FOREIGN KEY (runId)
        REFERENCES runs(id) ON UPDATE CASCADE ON DELETE CASCADE
      CONSTRAINT results_fk_personId FOREIGN KEY (personId)
        REFERENCES persons(id) ON UPDATE CASCADE ON DELETE CASCADE
      )`
    return this.dao.run(sql)
  }
}

module.exports = Result;
