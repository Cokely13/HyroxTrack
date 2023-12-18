const router = require('express').Router()
const { models: { Average, Event, User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const averages = await Average.findAll({include: [User, Event]})
    const sort = averages.sort((a,b) => a.time < b.time )
    res.json(averages)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const average = await Average.findByPk(req.params.id, {include: [User, Event]});
    res.json(average);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Average.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const average = await Average.findByPk(req.params.id);
    res.send(await average.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const average = await Average.findByPk(req.params.id);
    await average.destroy();
    res.send(average);
  } catch (error) {
    next(error);
  }
});
