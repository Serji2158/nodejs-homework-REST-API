const controllerUsers = require('../controller/controllerUsers')
const express = require('express')
const router = express.Router()
// const { limiter } = require("../helpers/rate-limit-login");
const quard = require('../helpers/quard')
const upload = require('../helpers/uploads')

router.post('/signup', controllerUsers.reg)
router.post('/login', controllerUsers.login)
router.get('/logout', quard, controllerUsers.logout)
router.get('/current', quard, controllerUsers.current)
router.get('/verify/:token', controllerUsers.verify)
router.post('/verify', controllerUsers.repeatVerifyUser)
router.patch(
  '/avatars',
  quard,
  upload.single('avatar'),
  controllerUsers.avatars
)

module.exports = { usersRouter: router }
