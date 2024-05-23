const Queue = require('bull');
const { JOBS } = require('./constant');
const { redisConfig } = require('./redis.config');
const testQueue = new Queue(JOBS.test, redisConfig);

testQueue.process(JOBS.test, async (job, callback) => {
    // console.log({ job })
    // callback()
    return job
})


// Event listener for completed jobs
testQueue.on('completed', (job, result) => {
    console.log(`Job ID ${job.id} completed with result:`, result);
});

// Event listener for failed jobs
testQueue.on('failed', (job, err) => {
    console.error(`Job ID ${job.id} failed with error:`, err);
});


module.exports = testQueue;
