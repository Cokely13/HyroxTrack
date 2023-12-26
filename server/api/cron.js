const cron = require('node-cron');
const { models: { Challenge, Result }} = require('../db');
const Sequelize = require('sequelize');

function durationToSeconds(duration) {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
}

cron.schedule('*/1 * * * *', async () => {  // This will run every 5 minutes
    console.log(`Cron job running at ${new Date().toISOString()}`);
  try {
      const challengesToUpdate = await Challenge.findAll({
          where: {
              endDate: {
                  [Sequelize.Op.lt]: new Date()
              },
              active: true
          }
      });

      for (let challenge of challengesToUpdate) {
          const results = await Result.findAll({
              where: { challengeId: challenge.id },
              order: [[Sequelize.literal("duration_to_seconds(duration)"), 'ASC']]
          });

          for (let i = 0; i < results.length; i++) {
              results[i].rank = i + 1;
              await results[i].save();

              if (i === 0) {
                  challenge.champ = results[i].userId;
              }
          }

          challenge.active = false;
          await challenge.save();
      }
  } catch (error) {
      console.error('Error running the challenge update:', error);
  }
});

function duration_to_seconds(duration) {
  const [minutes, seconds = '0'] = duration.split(':');
  return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
}

Sequelize.prototype.duration_to_seconds = duration_to_seconds;
