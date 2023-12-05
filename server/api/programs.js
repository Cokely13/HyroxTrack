const router = require('express').Router()
const { models: { Program }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const workouts= await Program.findAll()
    res.json(workouts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const workoutId = req.params.id
    const program = await Program.findByPk(req.params.id);
    res.json(program);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Program.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const program = await Program.findByPk(req.params.id)
    res.send(await program.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const program = await Program.findByPk(req.params.id);
    await program.destroy();
    res.send(program);
  } catch (error) {
    next(error);
  }
});
