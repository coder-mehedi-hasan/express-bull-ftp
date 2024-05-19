const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const serveIndex = require('serve-index')
const upload = require('./upload')
const app = express();
const port = 3001;
const { JOBS } = require('./constant')
const orderQueue = require('./order_queue');
app.use(express.text());
app.use(express.json());


// Process jobs from the queue


app.post('/profile', upload.single('file'), function (req, res, next) {
  res.send("Upload successfully")
})

app.post('/upload-order', async (req, res) => {
  const body = req.body
  const job = await orderQueue.add(JOBS.order, body);
  res.send(job)
})

app.get('/test', async (req, res) => {
  res.json({ message: "up" })
})

app.use(
  '/ftps',
  express.static('public/ftp'),
  serveIndex('public/ftp', { icons: true })
)

app.listen(port, () => console.log(`🚀 is on port ${port}...`))
