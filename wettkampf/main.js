const Promise = require('bluebird');
const AppDAO = require('./dao');
const Person = require('./person');
const Run = require('./run');
const Result = require('./result');

function main() {
  const dao = new AppDAO('./database.sqlite3');
  const runData = {name: "1. virtueller Lauf", distance : 5.75}
  const person = new Person(dao);
  const run = new Run(dao);
  const result = new Result(dao);
  let runId

  run.createTable()
    .then(() => person.createTable())
    .then(() => result.createTable())
    .then(() => run.create(runData))
    .then((data) => {
      runId = data.id;
      console.log(runId);
    })
    .then(() => run.getById(runId))
    .then((runRecord) => {
      console.log(`Retrieved Run from database`);
      console.log(`run id = ${runRecord.id}`);
      console.log(`run name = ${runRecord.name}`);
    })
    .catch((err) => {
      console.log('Error: ');
      console.log(JSON.stringify(err));
    })
}
main();
