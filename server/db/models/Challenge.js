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
    defaultValue: true
  },
  startDate: {
    type: Sequelize.DATE,
  },
  endDate: {
    type: Sequelize.DATE,
  },
  invites: {
    type: Sequelize.ARRAY(Sequelize.INTEGER), // Array of integers
    defaultValue: []
  },
  champ: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.TEXT,
  }

})

module.exports = Challenge
