if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let mongoUrl = process.env.DB_URL
let PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
  PORT = process.env.TEST_PORT
  mongoUrl = process.env.TEST_DB_URL
}
module.exports = { mongoUrl, PORT }