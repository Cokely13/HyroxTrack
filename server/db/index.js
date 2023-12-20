//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Event = require('./models/Event')
const Target = require('./models/Target')
const Average = require('./models/Average')
const Challenge = require('./models/Challenge')
const Result = require('./models/Result')
const Program= require('./models/Program')
const Workout= require('./models/Workout')
const UserWorkout= require('./models/UserWorkout')

//associations could go here!
Event.hasMany(Result)
Result.belongsTo(Event)
Challenge.hasMany(Result)
Result.belongsTo(Challenge)
User.hasMany(Challenge)
Challenge.belongsTo(User)
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
Average.belongsTo(Event)
Average.belongsTo(User)
Event.hasMany(Average)
User.hasMany(Average)
Target.belongsTo(Event)
Target.belongsTo(User)
Event.hasMany(Target)
User.hasMany(Target)


module.exports = {
  db,
  models: {
    User,
    Challenge,
    Event,
    Result,
    Workout,
    UserWorkout,
    Program,
    Average,
    Target,
  },
}
