const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../../service/schemas/users')
// const userValidation = require("../../middlewares/validationMiddleware");
require('dotenv').config()
const secret = process.env.SECRET
// const { limiter } = require("../../helpers/rate-limit-login");

const authorization = require('../../middlewares/authorization')
const upload = require('../../helpers/uploads')
const { uploadAvatar } = require('../../controller/users')

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Email or password is wrong',
      data: 'Bad request',
    })
  }
  const id = user._id
  const payload = { id }
  const token = jwt.sign(payload, secret, { expiresIn: '1h' })
  await User.findByIdAndUpdate(id, token)
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      email: `${email}`,
    },
  })
})

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email in use',
      data: 'Conflict',
    })
  }
  try {
    const newUser = new User({ email })
    newUser.setPassword(password)
    await newUser.save()
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        message: 'Registration successful',
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatar,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/current', authorization, (req, res, next) => {
  const { email } = req.user
  res.json({
    status: 'success',
    code: 200,
    data: {
      email: `Authorization successful for: ${email}`,
      subscription: 'starter',
    },
  })
})

router.get('/logout', authorization, async (req, res, __) => {
  const id = req.user._id
  await User.findByIdAndUpdate(id, null)
  return res.status(204).json({})
})

router.patch('/avatars', authorization, upload.single('avatar'), uploadAvatar)

module.exports = { usersRouter: router }
