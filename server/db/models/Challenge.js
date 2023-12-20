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
  active: {
    type: Sequelize.BOOLEAN,
    defaultVaule: true
  },
  startDate: {
    type: Sequelize.DATEONLY,
  },
  endDate: {
    type: Sequelize.DATEONLY,
  },

})

module.exports = Challenge
