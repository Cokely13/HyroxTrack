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
  duration: {
    type: Sequelize.STRING,
    allowNull: false
  },
  target: {
    type: Sequelize.TIME,
}

})

module.exports = Average
