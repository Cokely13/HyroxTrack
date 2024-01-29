

const router = require('express').Router();
const { models: { User, Result, UserWorkout, Average, Target, Challenge }} = require('../db');
const { S3Client } = require('@aws-sdk/client-s3'); // AWS SDK v3
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3Client = new S3Client({ // Instantiate S3Client
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});


const upload = multer({
  storage: multerS3({
      s3: s3Client,
      bucket: process.env.S3_BUCKET_NAME,
      key: function (req, file, cb) {
          cb(null, Date.now().toString() + '-' + file.originalname);
      }
  })
});


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
            req.body.image = req.file.location; // URL of the uploaded file in S3
        }

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

module.exports = router;
