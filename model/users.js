const User = require('../service/schemas/users')

const updateAvatar = async (id, avatar, idUserCloud = null) => {
  return await User.updateOne({ _id: id }, { avatar, idUserCloud })
}

const getAvatar = async (id) => {
  const { avatar, idUserCloud } = await User.findOne({ _id: id })
  return { avatar, idUserCloud }
}

module.exports = { updateAvatar, getAvatar }
