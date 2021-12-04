// const express = require("express");
// const jwt = require("jsonwebtoken");
const passport = require('passport')
require('dotenv').config()
const { HttpCode } = require('../helpers/constants')

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Unauthorized',
        data: 'Unauthorized',
      })
    }
    console.log(user)
    req.user = user
    next()
  })(req, res, next)
}

module.exports = auth
