-- SQLite
SELECT * FROM results, persons, challenges
      WHERE challengeId = 1
        and results.personId = persons.id
        and results.challengeId = challenges.id
      ORDER BY time