const app = require('../app.js')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
require('dotenv').config()
const path = require('path')
const fs = require('fs').promises

const TMP_DIR = path.join(process.cwd(), process.env.TMP_DIR)

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}

const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST

const connectMongo = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connectMongo
  .then(() => {
    app.listen(PORT, async () => {
      await createFolderIsNotExist(TMP_DIR)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
