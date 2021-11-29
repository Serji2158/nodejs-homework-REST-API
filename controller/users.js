const fs = require('fs').promises
require('dotenv').config()
const cloudinary = require('cloudinary')

const UploadService = require('../helpers/cloud-upload')
const Users = require('../model/users')

const uploadAvatar = async (req, res, next) => {
  const { id, idUserCloud } = req.user
  const file = req.file

  const destination = 'Avatars'
  const uploadService = new UploadService(destination)
  const { avatarUrl, returnIdUserCloud } = await uploadService.save(
    file.path,
    idUserCloud
  )

  const oldAvatar = await Users.getAvatar(id)
  cloudinary.uploader.destroy(oldAvatar)

  await Users.updateAvatar(id, avatarUrl, returnIdUserCloud)
  try {
    await fs.unlink(file.path)
  } catch (error) {
    console.log(error.message)
  }
  return res.status(200).json({
    status: 'success',
    code: 200,
    date: {
      avatar: avatarUrl,
    },
  })
}

module.exports = {
  //   registration,
  //   login,
  //   logout,
  uploadAvatar,
}
