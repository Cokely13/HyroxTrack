// const router = require("express").Router();
// const AWS = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// module.exports = router

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });

// const s3 = new AWS.S3();

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.S3_BUCKET_NAME,
//         acl: 'public-read',
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString() + '-' + file.originalname);
//         }
//     })
// });

// router.put('/:id', upload.single('image'), async (req, res, next) => {
//   try {
//       const user = await User.findByPk(req.params.id);
//       if (req.file) {
//           // The file is automatically uploaded to S3, and the URL is available on req.file.location
//           req.body.image = req.file.location;
//       }
//       const updatedUser = await user.update(req.body);
//       res.json(updatedUser);
//   } catch (error) {
//       next(error);
//   }
// });
