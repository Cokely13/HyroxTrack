// const router = require('express').Router()
// const { models: { User, Result, UserWorkout, Average, Target, Challenge }} = require('../db')
// module.exports = router
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and username fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'userName', 'admin', 'image'],
//       include: [Result, UserWorkout, Average, Target, Challenge, ]
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

// router.get('/:id', async (req, res, next) => {
//   try {
//     const event = await User.findByPk(req.params.id, {include: [Result, UserWorkout, Average, Target, Challenge]});
//     res.json(event);
//   } catch (err) {
//     next(err);
//   }
// });

// router.put('/:id', upload.single('image'), async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);

//     // If there's an uploaded file, update the image path
//     if (req.file) {
//       const imagePath = req.file.path; // Path where the image is saved
//       req.body.image = imagePath;
//     }

//     // Update user with provided data and the new image path
//     const updatedUser = await user.update(req.body);
//     res.json(updatedUser);
//   } catch (error) {
//     next(error);
//   }
// });



// router.delete('/:id', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     await user.destroy();
//     res.send(user);
//   } catch (error) {
//     next(error);
//   }
// });

const router = require('express').Router();
const { models: { User, Result, UserWorkout, Average, Target, Challenge }} = require('../db');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

// AWS S3 configuration
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// const S3_BUCKET = process.env.S3_BUCKET

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read',
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
