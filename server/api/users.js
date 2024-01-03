const router = require('express').Router()
const { models: { User, Result, UserWorkout, Average, Target, Challenge }} = require('../db')
module.exports = router
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'userName', 'admin', 'image'],
      include: [Result, UserWorkout, Average, Target, Challenge, ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const event = await User.findByPk(req.params.id, {include: [Result, UserWorkout, Average, Target, Challenge]});
    res.json(event);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', upload.single('image'), async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    // If there's an uploaded file, update the image path
    if (req.file) {
      const imagePath = req.file.path; // Path where the image is saved
      req.body.image = imagePath;
    }

    // Update user with provided data and the new image path
    const updatedUser = await user.update(req.body);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (error) {
    next(error);
  }
});
