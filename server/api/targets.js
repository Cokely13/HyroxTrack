const router = require('express').Router()
const { models: { Target, Event, User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const targets = await Target.findAll({include: [User, Event]})
    const sort = targets.sort((a,b) => a.time < b.time )
    res.json(targets)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const target = await Target.findByPk(req.params.id, {include: [User, Event]});
    res.json(target);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Target.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const target = await Target.findByPk(req.params.id);
    res.send(await target.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const target = await Target.findByPk(req.params.id);
    await target.destroy();
    res.send(target);
  } catch (error) {
    next(error);
  }
});
