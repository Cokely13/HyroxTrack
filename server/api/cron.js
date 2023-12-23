const cron = require('node-cron');
const { models: { Challenge, Result }} = require('../db')

function durationToSeconds(duration) {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
}

cron.schedule('0 0 * * *', async () => {
  try {
      const challengesToUpdate = await Challenge.findAll({
          where: {
              endDate: {
                  [Sequelize.Op.lt]: new Date()
              },
          }
      });

      for (let challenge of challengesToUpdate) {
          const results = await Result.findAll({
              where: { challengeId: challenge.id },
          });

          if (results.length > 0) {
              // Convert all durations to seconds and find the minimum duration
              const minDuration = Math.min(...results.map(result => durationToSeconds(result.duration)));

              // Find the winning result
              const winningResult = results.find(result => durationToSeconds(result.duration) === minDuration);

              if (winningResult) {
                  challenge.champ = winningResult.userId;
                  challenge.active = false;
                  await challenge.save();
              }
          }
      }
  } catch (error) {
      console.error('Error running daily challenge update:', error);
  }
});
