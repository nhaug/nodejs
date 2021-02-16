// Anleitung von

const AppDAO = require('./dao');
const Person = require('./person');
const Challenge = require('./challenge');
const Result = require('./result');

function main() {
  try {
  const dao = new AppDAO('./database.sqlite3');
  const challenge = {name: "1. virtueller Lauf", distance : 5.75}
  const personDao = new Person(dao);
  const challengeDao = new Challenge(dao);
  const resultDao = new Result(dao);
  //const Promise = new Promise();
  let challengeId

  challengeDao.createTable()
    .then(() => personDao.createTable())
    .then(() => resultDao.createTable())
    /*.then(() => challenge.getByField('name',challengeData.name))
    //.then((data) => {
      if (data === undefined) {
        console.log("Wettkampf gibts noch nicht")
        challenge.create(challengeData)
      } else {
        challenge = data.id
        console.log("Wettkampf gibts schon:"+challenge);
      }
    })*/
    .then(() => challengeDao.create(challenge))
    .then(() => challengeDao.getByField('name',challenge.name))
    .then((data) => {
      if (data == null) {
        console.log("Kein Treffer")
      }
      console.log(`Retrieved Challenge from database` + JSON.stringify(data));
      console.log(`Challenge id = ${data.id}`);
      console.log(`Challenge name = ${data.name}`);
      challengeId = data.id
      const results = [
        { lastName:"Haug", firstName:"Nilsi", geschlecht:"m", zeit: "00:20:29", challengeId },
        { lastName:"Osterwald", firstName:"Konstantin", geschlecht:"m", zeit :"00:20:30", challengeId }
      ]
      //return resultDao.create(lastName, firstName, geschlecht, zeit, challengeId);
      return Promise.all(results.map((result) => {
        const { lastName, firstName, geschlecht, zeit, challengeId } = result
        return resultDao.create(lastName, firstName, geschlecht, zeit, challengeId)
      }))
    }).then(() => resultDao.getAllResults(challengeId))
    .then((results) => {
      console.log("THE RESULTS");

      results.map((result) => {
        console.log(result);
      })
    })
    .catch((err) => {
      console.log('Error: ');
      console.log(JSON.stringify(err));
      console.log(JSON.stringify(err.stack));
      throw err
    })
  }catch (ex) {
    console.log("Exception ..."+ex + ex.stack);
  }
}
main();
