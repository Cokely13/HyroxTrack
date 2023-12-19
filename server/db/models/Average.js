const Sequelize = require('sequelize')
const db = require('../db')

const Average = db.define('average', {
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

})

module.exports = Average
