const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const serveIndex = require('serve-index')

const app = express();
const port = process.env.SERVER_PORT ?? 4553;

const router = express.Router()
app.use(express.text());
app.use(express.json());
const routes = require('./routes')(router, {});

app.use('/api/v1', routes)
app.use(
  '/ftps',
  express.static('public/ftp'),
  serveIndex('public/ftp', { icons: true })
)

app.listen(port, () => console.log(`🚀Server🚀 is on port ${port}...`))
