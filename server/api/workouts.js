const router = require('express').Router()
const { models: { Event, Workout}} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const workouts= await Workout.findAll({include: [Event]})
    res.json(workouts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const workoutId = req.params.id
    const workout = await Workout.findByPk(req.params.id, {include: [Event]});
    res.json(workout);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Workout.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id)
    res.send(await workout.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    await workout.destroy();
    res.send(workout);
  } catch (error) {
    next(error);
  }
});
