const cron = require('node-cron');
const singleWebScraper = require('./singleWebScraper');

let scheduledTask = null;

const startCronJob = () => {
    if (scheduledTask) {
        console.log("Cron job is already running.");
        return;
    }

    scheduledTask = cron.schedule('2 * * * *', () => {
        console.log(' Running scraper at 0:20 AM...');
        singleWebScraper();
    });

    console.log("Cron job started. Scraper will run daily at 0:020 AM.");
};

const stopCronJob = () => {
    if (scheduledTask) {
        scheduledTask.stop();
        scheduledTask = null;
        console.log("Cron job stopped.");
    } else {
        console.log(" No active cron job to stop.");
    }
};

module.exports = { startCronJob, stopCronJob };
