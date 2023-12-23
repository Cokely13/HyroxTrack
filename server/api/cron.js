const cron = require('node-cron');
const { models: { Challenge, Result }} = require('../db')

cron.schedule('0 0 * * *', async () => {
    // This will run every day at midnight
    try {
        const challengesToUpdate = await Challenge.findAll({
            where: {
                endDate: {
                    [Sequelize.Op.lt]: new Date() // Find challenges where endDate is in the past
                },
            }
        });

        for (let challenge of challengesToUpdate) {
            // Logic to find the champ and update the challenge
            // Example:
            const winningResult = await Result.findOne({
                where: { challengeId: challenge.id },
                order: [['duration', 'ASC']] // Assuming 'duration' is a field that stores time taken to complete the challenge
            });

            if (winningResult) {
                challenge.champ = winningResult.userId;
                challenge.active = false;
                await challenge.save();
            }
        }
    } catch (error) {
        console.error('Error running daily challenge update:', error);
    }
});
