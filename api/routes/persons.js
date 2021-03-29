const Joi = require('joi');
const {Router} = require('express');

const AppDAO = require('../dao');
const Person = require('../person');

const dao = new AppDAO('./wettkampf/database.sqlite3');

const router = new Router();
const personDao = new Person(dao);

/**
 * Prüfe ob der Body ok ist
 * @param {*} body
 * @return {Boolean} Body is valid
 */
function validateBody(body) {
  const schema = Joi.object({
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    geschlecht: Joi.string().valid('m', 'w').required(),
  });
  return schema.validate(body);
}

// Handler einrichten
router.get('/', async (req, res) => {
  console.log('get Person');
  const all = await personDao.getAll();
  return res.send(all);
});

router.post('/', async (req, res) => {
  const {error} = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    lastName, firstName, geschlecht,
  } = req.body;

  const posted = await personDao.create(lastName,
      firstName,
      geschlecht);
  return res.send(posted);
});

router.put('/:personId', async (req, res) => {
  const {personId} = req.params;
  const person = await personDao.getById(personId);
  if (!person) {
    res.status(404);
    return res.send(`No Result for ID ${req.params.resultId} found`);
  }


  const {error} = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    lastName, firstName, geschlecht, time, challengeId,
  } = req.body;

  person.lastName = lastName;
  person.firstName = firstName;
  person.geschlecht = geschlecht;
  person.time = time;
  person.challengeId = challengeId;

  return res.send(person);
});

router.delete('/:personId', async (req, res) => {
  const {personId} = req.query;
  const person = await personDao.getById(personId);
  if (!person) {
    res.status(404);
    return res.send(`No Result for ID ${req.params.resultId} found`);
  }
  const done = personDao.delete(person);

  return res.send(done);
});

module.exports = router;
