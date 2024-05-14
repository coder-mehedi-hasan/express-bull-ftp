
const Queue = require('bull');


const redisConfig = {
    redis: {
        port: 6379, // Redis server port
        host: 'localhost', // Redis server host
    },
};

const myQueue = new Queue('test', redisConfig);

// Add a job to the queue
myQueue.add({
    data: {
        message: 'Hello, Queue!',
    },
});

// Process jobs from the queue
myQueue.process((job) => {
    console.log('Processing job:', job?.data?.data);
    // Add your job processing logic here
    // ...
    return Promise.resolve(); // Resolve the promise when the job processing is complete
});

// Event listener for completed jobs
myQueue.on('completed', (job, result) => {
    console.log(`Job ID ${job.id} completed with result:`, result);
});

// Event listener for failed jobs
myQueue.on('failed', (job, err) => {
    console.error(`Job ID ${job.id} failed with error:`, err);
});



// app.listen(4300, () => {
//     console.log("Server started at http://localhost:4300");
// });
