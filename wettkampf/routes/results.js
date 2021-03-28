const Joi = require('joi');
const { Router } = require('express');

const router = Router();
const Result = require('../result');
const AppDAO = require('../dao');
const Challenge = require('../challenge');

const dao = new AppDAO('./wettkampf/database.sqlite3');
const resultDao = new Result(dao);
const challengeDao = new Challenge(dao);

function validateBody(body) {
  const schema = Joi.object({
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    geschlecht: Joi.string().valid('m', 'w').required(),
    time: Joi.string().regex(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/).required(),
    challengeId: Joi.number().required(),
  });
  return schema.validate(body);
}

// Handler einrichten
router.get('/', async (req, res) => {
  const { geschlecht, challengeId } = req.query;
  const allResults = await resultDao.getPlatzierung(challengeId, geschlecht);
  // res.send(allResults);
  res.send(allResults);
});

router.post('/', async (req, res) => {
  const { error } = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    lastName, firstName, geschlecht, time, challengeId,
  } = req.body;

  const challenge = await challengeDao.getById(challengeId);

  const postedResult = await resultDao.create(lastName,
    firstName,
    geschlecht,
    time,
    challenge.distance,
    challengeId);
  return res.send(postedResult);
});

router.put('/:resultId', async (req, res) => {
  const { resultId } = req.params;
  const result = await resultDao.getById(resultId);
  if (!result) return res.status(404).send(`No Result for ID ${req.params.resultId} found`);

  const { error } = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    lastName, firstName, geschlecht, time, challengeId,
  } = req.body;

  result.lastName = lastName;
  result.firstName = firstName;
  result.geschlecht = geschlecht;
  result.time = time;
  result.challengeId = challengeId;

  return res.send(result);
});

router.delete('/:resultId', async (req, res) => {
  const { resultId } = req.query;
  const result = await resultDao.getById(resultId);
  if (!result) return res.status(404).send(`No Result for ID ${req.params.resultId} found`);
  const done = resultDao.delete(result);

  return res.send(done);
});

module.exports = router;
