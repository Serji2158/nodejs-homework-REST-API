const passport = require('passport')
require('../config/passport')
const { HttpCode } = require('./constants')

const quard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user) {
      return next({
        status: HttpCode.FORBIDEN,
        message: 'Forbidden',
      })
    }
    req.user = user
    return next()
  })(req, res, next)
}

module.exports = quard
