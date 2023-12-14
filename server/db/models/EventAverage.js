const Sequelize = require('sequelize')
const db = require('../db')

const EventAverage = db.define('eventAverage', {
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  time: {
      type: Sequelize.TIME,
  }

})

module.exports = EventAverage
