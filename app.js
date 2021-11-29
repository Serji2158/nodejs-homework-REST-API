const express = require('express')
const cors = require('cors')
const logger = require('morgan')
require('./config/config-passport')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { apiLimit, jsonLimit } = require('./config/api-limit.json')
const path = require('path')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(express.json({ limit: jsonLimit }))
app.use(logger(formatsLogger))
app.use(cors())
app.use(helmet())

app.use(
  '/api/',
  rateLimit({
    windowMs: apiLimit.windowMs,
    max: apiLimit.max,
  })
)

const { contactsRouter } = require('./routes/api/contacts')
const { usersRouter } = require('./routes/api/auth')

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    data: 'Not found',
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
