// result.js
const Person = require('./person')
class Result {

  constructor(dao) {
      this.dao = dao
      this.personDao = new Person(this.dao);
      this.table = 'results';
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      zeit REAL,
      pace REAL,
      challengeId INTEGER,
      personId INTEGER,
      CONSTRAINT results_fk_challengeId FOREIGN KEY (challengeId)
        REFERENCES challenges(id) ON UPDATE CASCADE ON DELETE CASCADE
      CONSTRAINT results_fk_personId FOREIGN KEY (personId)
        REFERENCES persons(id) ON UPDATE CASCADE ON DELETE CASCADE
      )`
    return this.dao.run(sql)
  }

  create(lastName, firstName, geschlecht, zeit, challengeId ) {
    this.personDao.getByName(lastName,firstName)
    .then((person) => {
        if (person == undefined) {
          this.personDao.create(lastName, firstName, geschlecht)
       }
    })
    .then(() => this.personDao.getByName(lastName,firstName))
    .then((person) => {
      console.log("Geschafft, jetzt können wir das Result eintragen für "+person.id)
      const sql = `
        INSERT INTO ${this.table}
        (personId, challengeId, zeit)
        VALUES (?,?,?)
      `
      this.dao.run(sql,[person.id,challengeId,zeit])
    })/*.catch((err) => {
      console.log('Error: ');
      console.log(JSON.stringify(err));
    })*/

  }

  getAllResults(challengeId) {
    return this.dao.all(`SELECT * FROM results WHERE challengeId = ?`,[challengeId])
  }
}

module.exports = Result;
