const Sequelize = require('sequelize')
const db = require('../db')

const Challenge = db.define('challenge', {
  eventId: {
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
    defaultVaule: 1
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },

})

module.exports = Challenge
