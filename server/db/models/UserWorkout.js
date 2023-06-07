const Sequelize = require('sequelize')
const db = require('../db')

const UserWorkout = db.define('userworkout', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  workoutId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }

})

module.exports = UserWorkout
