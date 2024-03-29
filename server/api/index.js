const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/averages', require('./averages'))
router.use('/challenges', require('./challenges'))
router.use('/targets', require('./targets'))
router.use('/programs', require('./programs'))
router.use('/events', require('./events'))
router.use('/results', require('./results'))
router.use('/workouts', require('./workouts'))
router.use('/userworkouts', require('./userworkouts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
