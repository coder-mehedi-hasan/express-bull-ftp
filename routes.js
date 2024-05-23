const upload = require('./upload')
const { JOBS } = require('./constant')
const orderQueue = require('./order_queue');
const testQueue = require('./test_queue');

module.exports = (app) => {
    app.post('/save-order', upload.single('file'), function (req, res, next) {
        res.status(200).json({ success: true })
    })

    app.post('/order-callback', function (req, res) {
        console.log("from callback", req?.body)
        res.status(200).json(req?.body)
    })

    app.post('/upload-order', async (req, res) => {
        const body = req.body;
        const callbackUrl = req?.headers?.callback_url
        const job = await orderQueue.add(JOBS.order, { body, callbackUrl });
        // console.log(req?.headers?.callback_url)
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