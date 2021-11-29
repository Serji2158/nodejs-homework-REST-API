const multer = require('multer')
require('dotenv').config()
const path = require('path')

const TMP_DIR = path.join(process.cwd(), process.env.TMP_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TMP_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: storage,
  limits: { fieldSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true)
    }
    cb(null, false)
  },
})

module.exports = upload
