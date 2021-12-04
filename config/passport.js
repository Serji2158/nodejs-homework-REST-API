// By Cuchma//
const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { UserService } = require('../service')
require('dotenv').config()
const SECRET = process.env.SECRET

const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
}

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const service = new UserService()
      const user = await service.findById(payload.id)
      if (!user) {
        return done(new Error('User not found'))
      }
      if (!user.token) {
        return done(null, false)
      }
      return done(null, user)
    } catch (error) {
      done(error)
    }
  })
)
