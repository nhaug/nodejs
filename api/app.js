// Bibliotheken
const express = require('express');
const debug = require('debug')('app:main');

// lokale Module
const morgan = require('morgan');
const AppDAO = require('./dao');
const Person = require('./person');
const Challenge = require('./challenge');
const Result = require('./result');

// import Routes
// const resultsRoute = require('./routes/results');
const resultsRoute = require('./routes/results');
const challengeRoute = require('./routes/challenge');
const personRoute = require('./routes/persons');

// Initialisierung
const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/challenge', challengeRoute);
app.use('/api/results', resultsRoute);
app.use('/api/persons', personRoute);

// PORT nutzen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`Listening on Port .. ${port}`);
});

/**
 *
 */
async function initApp() {
  const dao = new AppDAO('./wettkampf/database.sqlite3');
  const challengeData = {name: '1. virtueller Lauf', distance: 5.75};
  const personDao = new Person(dao);
  const challengeDao = new Challenge(dao);
  const resultDao = new Result(dao);
  await challengeDao.createTable();
  debug('challenge Table created');
  await personDao.createTable();
  debug('Person Table created');
  await resultDao.createTable();
  debug('Result Table created');
  const challengeCreated = await challengeDao.create(challengeData);
  // const challenge = await challengeDao.getById(challengeCreated.id);
  debug(challengeCreated);
  const challenge = await challengeDao.getByField('name', challengeData.name);
  debug('Challenge: ', challenge);
}

initApp();
