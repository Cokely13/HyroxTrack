const router = require('express').Router()
const { models: { Challenge, Result, User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const challenges = await Challenge.findAll({include: [User, Result]})
    const sort = challenges.sort((a,b) => a.time < b.time )
    res.json(challenges)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id, {include: [User, Result]});
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Challenge.create(req.body));
  } catch (error) {
    next(error);
  }
});

// router.put('/:id', async (req, res, next) => {
//   try {
//     const challenge = await Challenge.findByPk(req.params.id);
//     res.send(await challenge.update(req.body));
//   } catch (error) {
//     next(error);
//   }
// });
router.put('/:id', async (req, res, next) => {
  try {
    const { rankUpdates, ...challengeUpdateData } = req.body; // Destructure rankUpdates from the request body

    // Update the challenge
    const challenge = await Challenge.findByPk(req.params.id);
    await challenge.update(challengeUpdateData);

    // Update the ranks of the results if rankUpdates is provided
    if (rankUpdates && rankUpdates.length) {
      for (const rankUpdate of rankUpdates) {
        const result = await Result.findByPk(rankUpdate.id);
        await result.update({ rank: rankUpdate.rank });
      }
    }

    res.send('Challenge and results updated successfully');
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    await challenge.destroy();
    res.send(challenge);
  } catch (error) {
    next(error);
  }
});
