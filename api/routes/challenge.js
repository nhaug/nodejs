const Joi = require('joi');
const {Router} = require('express');

const router = new Router();
const AppDAO = require('../dao');
const Challenge = require('../challenge');

const dao = new AppDAO('./wettkampf/database.sqlite3');
const challengeDao = new Challenge(dao);

/**
 * Validate Body
 * @param {*} body
 * @return {boolean} Body valid
 */
function validateBody(body) {
  const schema = Joi.object({
    name: Joi.string().required(),
    distance: Joi.number().required(),
  });
  return schema.validate(body);
}
router.get('/', async (req, res) => {
  const allResults = await challengeDao.getAll();
  // res.send(allResults);
  return res.send(allResults);
});

router.get('/:challengeId', async (req, res) => {
  const {challengeId} = req.params;
  const challenge = await challengeDao.getById(challengeId);
  // res.send(allResults);
  return res.send(challenge);
});

router.post('/', async (req, res) => {
  const {error} = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {
    name, distance,
  } = req.body;

  const challenge = {
    name,
    distance,
  };

  // results.push(result);
  const postedChallenge = await challengeDao.create(challenge);
  return res.send(postedChallenge);
});

router.put('/:challengeId', async (req, res) => {
  const {challengeId} = req.params;
  const challenge = await challengeDao.getById(challengeId);
  if (!challenge) {
    res.send(`No challenge for ID ${req.params.challengeId} found`);
    return res.status(404);
  }
  const {error} = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    name, distance,
  } = req.body;

  challenge.name = name;
  challenge.distance = distance;

  const challengeUpdated = await challengeDao.put(challenge);

  return res.send(challengeUpdated);
});

router.delete('/:challengeId', async (req, res) => {
  const {challengeId} = req.params;
  console.log(challengeId);
  const challenge = await challengeDao.getById(challengeId);
  if (!challenge) {
    res.status(404);
    return res.send(`No challenge for ID ${req.params.resultId} found`);
  }

  const done = await challengeDao.delete(challenge.id);
  return res.send(done);
});

module.exports = router;
