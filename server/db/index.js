//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Event = require('./models/Event')
const EventAverage = require('./models/EventAverage')
const Result = require('./models/Result')
const Program= require('./models/Program')
const Workout= require('./models/Workout')
const UserWorkout= require('./models/UserWorkout')

//associations could go here!
Event.hasMany(Result)
Result.belongsTo(Event)
User.hasMany(Result)
Result.belongsTo(User)
Event.hasMany(Workout)
Workout.belongsTo(Event)
User.hasMany(UserWorkout)
Workout.hasMany(UserWorkout)
UserWorkout.belongsTo(User)
Event.hasMany(UserWorkout)
UserWorkout.belongsTo(Workout)
UserWorkout.belongsTo(Event)
EventAverage.belongsTo(Event)
EventAverage.belongsTo(User)
Event.hasMany(EventAverage)
User.hasMany(EventAverage)

module.exports = {
  db,
  models: {
    User,
    Event,
    Result,
    Workout,
    UserWorkout,
    Program,
    EventAverage,
  },
}
