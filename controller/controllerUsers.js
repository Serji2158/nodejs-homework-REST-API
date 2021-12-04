const { AuthService, UserService } = require('../service')

const { HttpCode } = require('../helpers/constants')
// const { usersRouter } = require('../routes/userAuth')

const serviceUser = new UserService()
const serviceAuth = new AuthService()

const reg = async (req, res, next) => {
  const { email, password } = req.body
  const user = await serviceUser.findByEmail({ email })
  console.log(user, email)
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email in use',
      data: 'Conflict',
    })
  }
  try {
    const newUser = await serviceUser.create({ email, password })
    console.log(newUser)
    newUser.setPassword(password)
    await newUser.save()
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
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
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const token = await serviceAuth.login({ email, password })
    if (token) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          token,
          email: `${email}`,
        },
      })
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      code: HttpCode.UNAUTHORIZED,
      message: 'Email or password is wrong',
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, __) => {
  const id = req.user._id
  await serviceAuth.logout(id)
  return res.status(HttpCode.NO_CONTENT).json({
    status: 'success',
    code: HttpCode.NO_CONTENT,
  })
}

const avatars = async (req, res, next) => {
  const id = req.user._id
  console.log(id)
  const pathFile = req.file.path
  const url = await serviceUser.updateAvatar(id, pathFile)
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    avatarUrl: url,
  })
}

const verify = async (req, res, next) => {
  try {
    const result = await serviceUser.verify(req.params)
    if (result) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          message: 'Verification successful',
        },
      })
    } else {
      return next({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Sorry, your verification token is not valid',
      })
    }
  } catch (e) {
    next(e)
  }
}

const repeatVerifyUser = async (req, res, next) => {
  const { email } = req.body
  const result = await serviceUser.findByEmail(email)
  console.log(result.email)
  if (!result.email) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: "Email doesn't exist",
    })
  }

  if (!result.verifyToken) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Verification has already been passed',
    })
  }

  try {
    await serviceUser.repeatVerify(result.verifyToken, result.email)
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Verification email sent',
    })
  } catch (e) {
    next(e)
  }
}

const current = async (req, res, next) => {
  console.log(req.user._id)
  try {
    const id = req.user._id
    console.log(req.user.id)
    const user = await serviceUser.getCurrentUserInfo(id)
    if (user) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          user,
        },
      })
    } else {
      return next({
        status: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials',
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  reg,
  login,
  logout,
  avatars,
  verify,
  repeatVerifyUser,
  current,
}
