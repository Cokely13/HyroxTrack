const Sequelize = require('sequelize')
const db = require('../db')

const Result = db.define('result', {
  eventName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  duration: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
})

module.exports = Result
