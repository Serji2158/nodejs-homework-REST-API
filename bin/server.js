const app = require('../app.js')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

require('dotenv').config()

const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST

const connectMongo = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connectMongo
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
