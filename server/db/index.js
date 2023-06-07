//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Event = require('./models/Event')
const Result = require('./models/Result')
const Workout= require('./models/Workout')

//associations could go here!
Event.hasMany(Result)
Result.belongsTo(Event)
User.hasMany(Result)
Result.belongsTo(User)
Event.hasMany(Workout)
Workout.belongsTo(Event)

module.exports = {
  db,
  models: {
    User,
    Event,
    Result,
    Workout
  },
}
