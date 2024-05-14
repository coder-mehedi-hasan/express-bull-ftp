const Queue = require('bull');
const { JOBS } = require('./constant');
const { redisConfig } = require('./redis.config');
const fsProm = require("fs/promises")
const orderQueue = new Queue(JOBS.order, redisConfig);
const fs = require('fs');
const { default: axios } = require('axios');
const apiUrl = 'http://localhost:3002/profile';


orderQueue.process(JOBS.order, async (job, callback) => {
    try {
        console.log('Processing job', job.id, job.data);

        const content = job.data;

        // Specify the file path
        const filePath = 'order-hl7.txt';

        // Write content to the file
        await fs.writeFile(filePath, content, (err, blob) => {
            if (err) {
                console.error('Error creating the file:', err);
                return;
            }
            console.log('File created successfully.', blob);
        });

        function saveFile(path) {
            fs.readFile(path, async (err, blob) => {
                if (err) {
                    return
                }
                console.log(blob.buffer.byteLength)
                if (blob.buffer.byteLength === 0) {
                    await saveFile(path)
                } else {
                    const form = new FormData();
                    const file = await new File([blob], path, { type: "text/plain" });
                    if (file) {
                        form.append("file", file);
                        const response = await axios.post(apiUrl, form)
                        // console.log(response.data);
                    }
                }

            })
        }
        await saveFile(filePath)
        await callback();
        return { success: true };
    } catch (err) {
        console.log(err);
    }
})


// Event listener for completed jobs
orderQueue.on('completed', (job, result) => {
    console.log(`Job ID ${job.id} completed with result:`, result);
});

// Event listener for failed jobs
orderQueue.on('failed', (job, err) => {
    console.error(`Job ID ${job.id} failed with error:`, err);
});


module.exports = orderQueue;
