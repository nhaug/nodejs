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
  let challengeId;
  let distance;

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
      challengeId = data.id;
      distance = data.distance;
      const results = [
        { lastName:"Haug", firstName:"Nilsi", geschlecht:"m", time: "00:20:29", challengeId },
        { lastName:"Osterwald", firstName:"Konstantin", geschlecht:"m", time :"00:21:40", challengeId },
        { lastName:"Haug", firstName:"Nils", geschlecht:"m", time: "00:20:29", challengeId },
        { lastName:"Plesse", firstName:"Maik", geschlecht:"m", time :"00:20:25", challengeId }
      ]
      //return resultDao.create(lastName, firstName, geschlecht, time, challengeId);
      return Promise.all(results.map((result) => {
        //const { lastName, firstName, geschlecht, time, challengeId } = result
        //resultDao.create(lastName, firstName, geschlecht, time, distance, challengeId)
        new Promise(function(resolve, reject) {
          setTimeout(() => {
  console.log("Now"+result.lastName);
  resolve(" middle")
}, 1000)
        });
      }))
      .then(() => console.log("alles Geschafft"))
    })
    .then(() => {
      //console.log(challengeId);
      return resultDao.getAllResults(challengeId)})
    .then((results) => {
      console.log("THE RESULTS");

      results.map((result) => {
        console.log(result);
      })

      const male = results.filter((result) => result.geschlecht = "m")
      let platzierung = 0;
      let platzierungOffset = 0;
      let lastTime = "00:00:00";
      const malePlatzierung = male.map((result) => {
        const {time} = result;
        if (time > lastTime) {
          platzierung = platzierung + platzierungOffset + 1
          platzierungOffset = 0
        } else {
          platzierungOffset++
        }
        result.platzierung = platzierung;
        return result
      })
      console.log("Männliche Teilnehmer");
      console.log(malePlatzierung);

      const female = results.filter((result) => result.geschlecht == "w"
      )
      console.log("Weibliche Teilnehmer");
      console.log(female);
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
