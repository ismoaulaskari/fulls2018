if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let mongoUrl = process.env.DB_URL
let port = process.env.PORT

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  mongoUrl = process.env.TEST_DB_URL
}
module.exports = { mongoUrl, port }