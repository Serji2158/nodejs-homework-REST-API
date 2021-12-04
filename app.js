const express = require('express')
const cors = require('cors')
const logger = require('morgan')
require('./config/config-passport')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const { apiLimit, jsonLimit } = require('./config/api-limit.json')
const path = require('path')
const { ErrorHandler } = require('./helpers/errorHandler')
const { HttpCode } = require('./helpers/constants')
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const { contactsRouter } = require('./routes/api/contacts')
const { usersRouter } = require('./routes/userAuth')

app.use(express.json({ limit: jsonLimit }))
app.use(logger(formatsLogger))
app.use(cors())
app.use(helmet())

app.use(
  '/api/',
  rateLimit({
    windowMs: apiLimit.windowMs,
    max: apiLimit.max,
    handler: (req, res, next) => {
      next(
        new ErrorHandler(
          HttpCode.BAD_REQUEST,
          'Вы исчерпали количество запросов'
        )
      )
    },
  })
)

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    data: 'Not found',
  })
})

app.use((err, _, res, __) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: 'fall',
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
    data: 'Internal Server Error',
  })
})

module.exports = app
