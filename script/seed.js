'use strict'

const {db, models: {User, Event, Workout} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ userName: 'Ryan', password: '123', admin: true}),
    User.create({ userName: 'Jamal', password: '123' }),
  ])

  const events = await Promise.all([
    Event.create({ name: 'SkiErg', description: "1000 meters", image:"https://tiagolousa.com/wp-content/uploads/2023/04/double-hyrox-skierg-wod-1-jpg.webp", targetTime: "3:40"}),
    Event.create({ name: 'SledPush', description: "50 meters", image:"https://image.boxrox.com/2022/06/Tiago-Lousa-01.jpg", targetTime: "1:25" }),
    Event.create({ name: 'SledPull', description: "50 meters", image:"https://wp-test-dev.s3.amazonaws.com/public/uploads/2022/08/8106_20220226_095542_212535884_original.jpg", targetTime: "2:30"}),
    Event.create({ name: 'Burpee Broad Jumps', description: "80 meters", image:"https://wharf-life.com/wp-content/uploads/2021/09/Broad-Jumps-Credit-HYROXWEB.png", targetTime: "2:30"}),
    Event.create({ name: 'Rowing', description: "1000 meters", image:"https://wharf-life.com/wp-content/uploads/2021/09/Athletes-Rowing-Credit-HYROXWEB.png", targetTime: "4:00"}),
    Event.create({ name: 'Farmers Carry', description: "200 meters", image:"https://obstacleman.com/img/posts/hyroxLondon2022_farmersCarry.jpg", targetTime: "1:25"}),
    Event.create({ name: 'Sandbag Lunges', description: "100 meters", image:"https://daten.buffcoach.net/upload/foto/800/hyrox-lunges-essen-2019-jpg.jpg", targetTime: "3:00"}),
    Event.create({ name: 'Wall Balls', description: "100", image:"https://www.cycfitness.co.uk/uploads/products/gallery/hold-strong-hyrox-wall-ball-1643822493-1280.jpg", targetTime: "3:45"}),
    // Event.create({ name: 'Run', description: "1 Km", image:"https://www.mudrunguide.com/wp-content/uploads/2020/04/92948460_2632588537062132_3604830334308319232_o.jpg", targetTime: "5:35"}),
  ])

  const workouts = await Promise.all([
   Workout.create({ name: 'SkiErg', description: "5 rounds Ski 30 Seconds/30 Seconds Off", eventId: 1 }),
   Workout.create({ name: 'SkiErg', description: "2000m Ski", eventId: 1 }),
   Workout.create({ name: 'SkiErg', description: "3 rounds 500m Ski, 1 min rest", eventId: 1}),
   Workout.create({ name: 'Row', description: "5 rounds Row 30 Seconds/30 Seconds Off", eventId: 5 }),
   Workout.create({ name: 'Row', description: "2000m Row", eventId: 5 }),
   Workout.create({ name: 'Row', description: "3 rounds 500m Row, 1 min rest", eventId: 5}),
   Workout.create({ name: 'Wall Balls', description: "5 rounds Wall Balls 30 Seconds/30 Seconds Off", eventId: 7 }),
   Workout.create({ name: 'Wall Balls', description: "10 Rounds 20 Wall Balls, 1 minute rest", eventId: 7 }),
   Workout.create({ name: 'Wall Balls', description: "150 Wall Balls", eventId: 7}),
   Workout.create({ name: 'SledPush', description: "5 Minute max push", eventId: 2 }),
   Workout.create({ name: 'SledPush', description: "5 Rounds Push 30 seconds/30 seconds", eventId: 2}),
   Workout.create({ name: 'SledPush', description: "100 Meter max weight push", eventId: 2}),
   Workout.create({ name: 'SledPull', description: "5 Minute max pull", eventId: 3 }),
   Workout.create({ name: 'SledPull', description: "5 Rounds Pull 30 seconds/30 seconds", eventId: 3}),
   Workout.create({ name: 'SledPull', description: "100 Meter max weight pull", eventId: 3}),
   Workout.create({ name: 'Sandbag Lunges', description: "5 Rounds Lunges 30 seconds/30 seconds", eventId: 8 }),
   Workout.create({ name: 'Sandbag Lunges', description: "200 Meter Lunges", eventId: 8}),
   Workout.create({ name: 'Sandbag Lunges', description: "5 Minute max lunges", eventId: 8}),
   Workout.create({ name: 'Farmers Carry', description: "5 Rounds Farmers 30 seconds/30 seconds", eventId: 6}),
   Workout.create({ name: 'Farmers Carry', description: "300 Meter Farmers", eventId: 6}),
   Workout.create({ name: 'Farmers Carry', description: "5 Minute max hold", eventId: 6}),
   Workout.create({ name: 'Burpee Broad Jumps', description: "5 Rounds BBJ 30 seconds/30 seconds", eventId: 4}),
   Workout.create({ name: 'Burpee Broad Jumps', description: "150 Meter BBJ", eventId: 4}),
   Workout.create({ name: 'Burpee Broad Jumps', description: "5 Minute max BBJ", eventId: 4}),

  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${workouts.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
