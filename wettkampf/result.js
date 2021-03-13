// result.js
const Person = require('./person')
const Challenge = require('./challenge');
class Result {

  constructor(dao) {
      this.dao = dao
      this.personDao = new Person(this.dao);
      this.challengeDao = new Challenge(this.dao);
      this.table = 'results';
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      time REAL,
      pace REAL,
      challengeId INTEGER,
      personId INTEGER,
      CONSTRAINT results_fk_challengeId FOREIGN KEY (challengeId)
        REFERENCES challenges(id) ON UPDATE CASCADE ON DELETE CASCADE
      CONSTRAINT results_fk_personId FOREIGN KEY (personId)
        REFERENCES persons(id) ON UPDATE CASCADE ON DELETE CASCADE
      )`
    return await this.dao.run(sql)
  }

  async create(lastName, firstName, geschlecht, time, distance, challengeId) {
    //return new Promise((resolve, reject) => {
      let person = await this.personDao.getByName(lastName,firstName)
      
      console.log(person);
      if (person == undefined) {
          await this.personDao.create(lastName, firstName, geschlecht)
      }
      person = await this.personDao.getByName(lastName,firstName);
      let pace = this.calcPace(distance,time);
      
      console.log("Geschafft, jetzt können wir das Result eintragen für "+person.id)
        
      const sql = `
          INSERT INTO ${this.table}
          (personId, challengeId, time, pace)
          VALUES (?,?,?,?)
        `
      return await this.dao.run(sql,[person.id,challengeId,time,pace])
    }

  getAllResults(challengeId) {
    return this.dao.all(`SELECT * FROM results, persons, challenges
      WHERE challengeId = ?
        and results.personId = persons.id
        and results.challengeId = challenges.id
        ORDER BY results.time`,[challengeId])
  }

  calcPace(distance,time) {
    let timeArray = time.split(":");
    let hours = parseInt(timeArray[0]);
    let minutes = parseInt(timeArray[1]);
    let seconds = parseInt(timeArray[2]);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    let paceInSeconds = totalSeconds / distance;
    let paceMinutes = Math.floor((paceInSeconds / 60));
    let paceSeconds = Math.round(paceInSeconds % 60);
    let pace = paceMinutes+":"+paceSeconds
    //return {length, hours, minutes, seconds, totalSeconds, paceInSeconds, paceMinutes, paceSeconds, pace}
    return pace;
  };
}

module.exports = Result;
