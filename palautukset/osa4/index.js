const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require('./controllers/usersRouter')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl)
  .then(() => {
    console.log('connected to database')
  })
  .catch(err => {
    console.log(err)
  })
mongoose.Promise = global.Promise

const server = http.createServer(app)

if(!module.parent) {
  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
}

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
