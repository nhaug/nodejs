// NPM-Module
const debug = require('debug')('app:main');

// lokale Module
const AppDAO = require('./dao');
const Person = require('./person');
const Challenge = require('./challenge');
const Result = require('./result');
// const { resolve } = require('bluebird');

/**
 * Main Methode zum Testen
 */
async function newMain() {
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
  console.log(challengeCreated);
  const challenge = await challengeDao.getByField('name', challengeData.name);
  debug('Challenge: ', challenge);

  const results = [
    {
      lastName: 'Rohde',
      firstName: 'Nicolas',
      time: '00:19:38',
      geschlecht: 'm',
    },
    {
      lastName: 'Kuklinski',
      firstName: 'Fabian',
      time: '00:19:58',
      geschlecht: 'm',
    },
    {
      lastName: 'Plesse',
      firstName: 'Maik',
      time: '00:20:25',
      geschlecht: 'm',
    },
    {
      lastName: 'Haug',
      firstName: 'Nils',
      time: '00:20:29',
      geschlecht: 'm',
    },
    {
      lastName: 'Wolf',
      firstName: 'Torsten',
      time: '00:20:29',
      geschlecht: 'm',
    },
    {
      lastName: 'Lenfers',
      firstName: 'Ansger',
      time: '00:21:42',
      geschlecht: 'm',
    },
    {
      lastName: 'Kutz',
      firstName: 'Konstantin',
      time: '00:21:58',
      geschlecht: 'm',
    },
    {
      lastName: 'Osterwald',
      firstName: 'Konstantin',
      time: '00:22:51',
      geschlecht: 'm',
    },
    {
      lastName: 'Menke',
      firstName: 'Lukas',
      time: '00:23:39',
      geschlecht: 'm',
    },
    {
      lastName: 'Nagel',
      firstName: 'Gordon',
      time: '00:24:04',
      geschlecht: 'm',
    },
    {
      lastName: 'Bieker',
      firstName: 'Elias',
      time: '00:25:22',
      geschlecht: 'm',
    },
    {
      lastName: 'Webers',
      firstName: 'Janina',
      time: '00:26:00',
      geschlecht: 'w',
    },
    {
      lastName: 'Grotek',
      firstName: 'Karsten',
      time: '00:26:33',
      geschlecht: 'm',
    },
    {
      lastName: 'Sievers',
      firstName: 'Robin',
      time: '00:26:44',
      geschlecht: 'm',
    },
    {
      lastName: 'Kolbe',
      firstName: 'Ricarda',
      time: '00:26:44',
      geschlecht: 'w',
    },
    {
      lastName: 'Plinke',
      firstName: 'Svenja',
      time: '00:28:02',
      geschlecht: 'w',
    },
    {
      lastName: 'Debbary',
      firstName: 'Matthias',
      time: '00:28:35',
      geschlecht: 'm',
    },
    {
      lastName: 'Krettek',
      firstName: 'Sabine',
      time: '00:33:34',
      geschlecht: 'w',
    },
    {
      lastName: 'Schlachte',
      firstName: 'Roswita',
      time: '00:37:31',
      geschlecht: 'w',
    },
    {
      lastName: 'Menke',
      firstName: 'Milena',
      time: '00:40:15',
      geschlecht: 'w',
    },
  ];

  const allResultsSaved = await Promise.all(
      await results.map(async (r) => resultDao.create(r.lastName,
          r.firstName,
          r.geschlecht,
          r.time,
          challenge.distance,
          challenge.id)),
  );

  debug(allResultsSaved);

  const resultsFromDB = await resultDao.getAllResults(challenge.id);
  const femalePlatzierung = await resultDao.getPlatzierung(challenge.id, 'w');
  const malePlatzierung = await resultDao.getPlatzierung(challenge.id, 'm');

  debug('Alle Teilnehmer');
  debug(resultsFromDB);

  debug('Männliche Teilnehmer');
  debug(malePlatzierung);

  debug('Weibliche Teilnehmer');
  debug(femalePlatzierung);
}

newMain();
