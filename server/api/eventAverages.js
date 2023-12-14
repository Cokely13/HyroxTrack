const router = require('express').Router()
const { models: { EventAverage, Event, User }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const eventAverages = await EventAverage.findAll({include: User})
    const sort = eventAverages.sort((a,b) => a.time < b.time )
    res.json(eventAverages)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const eventAverage = await EventAverage.findByPk(req.params.id, {include: User});
    res.json(eventAverage);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await EventAverage.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const eventAverage = await EventAverage.findByPk(req.params.id);
    res.send(await eventAverage.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const eventAverage = await EventAverage.findByPk(req.params.id);
    await eventAverage.destroy();
    res.send(eventAverage);
  } catch (error) {
    next(error);
  }
});
