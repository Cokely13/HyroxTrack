// const Sequelize = require('sequelize')
// const db = require('../db')

// const Program = db.define('program', {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.TEXT,
//     allowNull: false
//   },

// })

// module.exports = Program

const Sequelize = require('sequelize');
const db = require('../db');

const Program = db.define('program', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  schedule: {
    type: Sequelize.JSONB, // Use JSONB data type to store the structured schedule
    allowNull: false,
  },
});

module.exports = Program;
