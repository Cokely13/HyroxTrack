const Sequelize = require('sequelize')
const db = require('../db')

const Workout = db.define('workout', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  done: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }

})

module.exports = Workout
