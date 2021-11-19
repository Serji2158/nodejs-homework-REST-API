const express = require('express')
const cors = require('cors')
const logger = require('morgan')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(express.json())
app.use(logger(formatsLogger))
app.use(cors())

const contactsRouter = require('./routes/api/contacts')
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  })
})

app.use((err, _, res, __) => {
  res.status(500).json({
    status: 'fall',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  })
})

module.exports = app
