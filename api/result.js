const debug = require('debug')('app:main');
const Person = require('./person');
const Challenge = require('./challenge');

/**
 *
 */
class Result {
  /**
   *
   * @param {*} dao
   */
  constructor(dao) {
    this.dao = dao;
    this.personDao = new Person(this.dao);
    this.challengeDao = new Challenge(this.dao);
    this.table = 'results';
  }

  /**
   *
   * @return {Object} Table Created
   */
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

  /**
   * Erstellt Result mit Namen
   * @param {*} lastName
   * @param {*} firstName
   * @param {*} geschlecht
   * @param {*} time
   * @param {*} distance
   * @param {*} challengeId
   * @return {String} Erstellte ID
   */
  async create(lastName, firstName, geschlecht, time, distance, challengeId) {
    // return new Promise((resolve, reject) => {
    let person = await this.personDao.getByName(lastName, firstName);
    if (!person) {
      debug('Es ist was zu tun');
      await this.personDao.create(lastName, firstName, geschlecht);
      person = await this.personDao.getByName(lastName, firstName);
    }
    this.time = time;
    this.distance = distance;
    const pace = this.calcPace();
    // eslint-disable-next-line max-len
    const resultAlreadyExists = await this.checkIfResultExists(challengeId, person.id);
    if (!resultAlreadyExists) {
      debug(`Result eintragen für ${person.lastName}`);
      const sql = `
          INSERT INTO ${this.table}
          (personId, challengeId, time, pace)
          VALUES (?,?,?,?)
        `;
      return this.dao.run(sql, [person.id, challengeId, time, pace]);
    }
    return resultAlreadyExists;
  }

  /**
   * Check if Result already exists
   * @param {*} challengeId
   * @param {*} personId
   * @return {boolean} Exists
   */
  async checkIfResultExists(challengeId, personId) {
    return this.dao.get(`SELECT * FROM results
      WHERE results.challengeId = ?
        and results.personId = ?`, [challengeId, personId]);
  }

  /**
   *Alle Results für einen Wettkampf
   * @param {*} challengeId
   * @return {JSON} Result
   */
  async getAllResults(challengeId) {
    return this.dao.all(`SELECT * FROM results, persons, challenges
      WHERE challengeId = ?
        and results.personId = persons.id
        and results.challengeId = challenges.id
      ORDER BY time`, [challengeId]);
  }

  /**
   * Alle Results inkl. Platzierung
   * @param {*} challengeId
   * @param {*} geschlecht
   * @return {JSON} Alle Results mit Platzierung
   */
  async getPlatzierung(challengeId, geschlecht) {
    let results = await this.getAllResults(challengeId);
    debug(geschlecht);
    debug(challengeId);
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
        platzierungOffset += 1;
      }
      lastTime = time;
      // eslint-disable-next-line no-param-reassign
      result.platzierung = platzierung;
      return result;
    });
    return platzierungen;
  }

  /**
   * Berechnet die Pace zur eingebenen Dauer und Länge der Strecke
   * @return {String} pace in 'mm:ss'
   */
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
