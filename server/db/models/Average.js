const Sequelize = require('sequelize')
const db = require('../db')

const Average = db.define('Average', {
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

module.exports = Average