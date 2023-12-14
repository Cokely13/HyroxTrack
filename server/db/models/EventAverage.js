const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('eventAverage', {
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
