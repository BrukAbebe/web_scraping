const singleWebScraper = require('./utils/singleWebScraper');
const paginateWebScraper = require('./utils/paginateWebScraper');
const { startCronJob, stopCronJob } = require('./utils/scheduler');

// singleWebScraper();

// paginateWebScraper();

const action = process.argv[2]; 

if (action === 'start') {
    startCronJob();
} else if (action === 'stop') {
    stopCronJob();
} else {
    console.log("Usage: node index.js start | stop");
}
