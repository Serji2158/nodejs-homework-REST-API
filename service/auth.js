const UserRepository = require('../model/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.SECRET

class AuthService {
  constructor() {
    this.repositories = {
      users: new UserRepository(),
    }
  }

  async login({ email, password }) {
    const user = await this.repositories.users.findByEmail(email)
    if (!user || !user.validPassword(password) || !user.verify) {
      return null
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    await this.repositories.users.updateToken(id, token)
    return token
  }

  async logout(id) {
    const data = await this.repositories.users.updateToken(id, null)
    return data
  }
}

module.exports = AuthService
