// result.js
const Person = require('./person');
const Challenge = require('./challenge');

class Result {
  constructor(dao) {
    this.dao = dao;
    this.personDao = new Person(this.dao);
    this.challengeDao = new Challenge(this.dao);
    this.table = 'results';
  }

  async createTable() {
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
      )`;
    return this.dao.run(sql);
  }

  async create(lastName, firstName, geschlecht, time, distance, challengeId) {
    // return new Promise((resolve, reject) => {
    let person = await this.personDao.getByName(lastName, firstName);
    if (!person) {
      console.log('Es ist was zu tun');
      await this.personDao.create(lastName, firstName, geschlecht);
      person = await this.personDao.getByName(lastName, firstName);
    }
    this.time = time;
    this.distance = distance;
    const pace = this.calcPace();
    const resultAlreadyExists = await this.checkIfResultExists(challengeId, person.id);
    if (!resultAlreadyExists) {
      console.log(`Geschafft, jetzt können wir das Result eintragen für ${person.lastName}`);
      const sql = `
          INSERT INTO ${this.table}
          (personId, challengeId, time, pace)
          VALUES (?,?,?,?)
        `;
      return this.dao.run(sql, [person.id, challengeId, time, pace]);
    }
    return resultAlreadyExists;
  }

  async checkIfResultExists(challengeId, personId) {
    return this.dao.get(`SELECT * FROM results
      WHERE results.challengeId = ?
        and results.personId = ?`, [challengeId, personId]);
  }

  async getAllResults(challengeId) {
    return this.dao.all(`SELECT * FROM results, persons, challenges
      WHERE challengeId = ?
        and results.personId = persons.id
        and results.challengeId = challenges.id
      ORDER BY time`, [challengeId]);
  }

  async getPlatzierung(challengeId, geschlecht) {
    let results = await this.getAllResults(challengeId);
    console.log(geschlecht);
    console.log(challengeId);
    if (geschlecht) {
      results = results.filter((result) => result.geschlecht === geschlecht);
    }
    let platzierung = 0;
    let platzierungOffset = 0;
    let lastTime = '00:00:00';
    const platzierungen = results.map((result) => {
      const { time } = result;
      if (time > lastTime) {
        platzierung = platzierung + platzierungOffset + 1;
        platzierungOffset = 0;
      } else {
        platzierungOffset++;
      }
      lastTime = time;
      result.platzierung = platzierung;
      return result;
    });
    return platzierungen;
  }

  calcPace() {
    const timeArray = this.time.split(':');
    const hours = parseInt(timeArray[0], 10);
    const minutes = parseInt(timeArray[1], 10);
    const seconds = parseInt(timeArray[2], 10);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const paceInSeconds = totalSeconds / this.distance;
    const paceMinutes = Math.floor((paceInSeconds / 60));
    const paceSeconds = Math.round(paceInSeconds % 60);
    const pace = `${paceMinutes}:${paceSeconds}`;
    return pace;
  }
}

module.exports = Result;
