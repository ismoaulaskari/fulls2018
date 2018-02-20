const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogsRouter')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use('/api/blogs', blogsRouter)


const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl)
  .then(() => {
    console.log('connected to database')
  })
  .catch(err => {
    console.log(err)
  })
mongoose.Promise = global.Promise

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
