const mongoose = require('mongoose')
const bCrypt = require('bcryptjs')
const gravatar = require('gravatar')

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    // minlength: [6, "Minimum password length is 6 characters"],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    // validate(value) {
    //   const rex = /\S+@\S+.\S+/;
    //   return rex.test(String(value).toLowerCase());
    // },
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true)
    },
  },
  idCloudAvatar: {
    type: String,
    default: null,
  },

  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
})

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6))
}

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
