const upload = require('./upload')
const { JOBS } = require('./constant')
const orderQueue = require('./order_queue');
const testQueue = require('./test_queue');

module.exports = (app) => {
    app.post('/save-order', upload.single('file'), function (req, res, next) {
        res.send("Upload successfully")
    })

    app.post('/upload-order', async (req, res) => {
        const body = req.body
        const job = await orderQueue.add(JOBS.order, body);
        res.send(job)
    })

    app.get("/test", async (req, res) => {
        const job = await testQueue.add(JOBS.test, { test: "success" })
        res.json(job)
    })

    app.get('/', async (req, res) => {
        res.json({ message: "up" })
    })

    return app;
}