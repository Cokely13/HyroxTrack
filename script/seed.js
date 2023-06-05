'use strict'

const {db, models: {User, Event} } = require('../server/db')

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

  console.log(`seeded ${users.length} users`)
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
