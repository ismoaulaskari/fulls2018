const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/loginRouter')
const tokenExtractor = require('./middleware/tokenExtractor')
//const error = require('./middleware/error')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(tokenExtractor.extract)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
//app.use(error())

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
