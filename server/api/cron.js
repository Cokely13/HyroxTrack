const cron = require('node-cron');
const { models: { Challenge, Result }} = require('../db');
const Sequelize = require('sequelize');

function durationToSeconds(duration) {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
}
cron.schedule('0 0 * * *', async () => {
    console.log(`Cron job running at ${new Date().toISOString()}`);
    try {
      const challengesToUpdate = await Challenge.findAll({
        where: {
            endDate: {
            [Sequelize.Op.lte]: new Date(), // Challenges with endDate today or in the past
        },
          active: true
        }
      });

      for (let challenge of challengesToUpdate) {
        let results = await Result.findAll({
          where: { challengeId: challenge.id }
        });

        if (results.length > 0) {
          // Sort results by duration in seconds
          results.sort((a, b) => durationToSeconds(a.duration) - durationToSeconds(b.duration));

          // Update ranks and find champ
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
      }
    } catch (error) {
      console.error('Error running the challenge update:', error);
    }
  });
