const config = require('./utils/config')

//const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogsRouter')

app.use(cors())
app.use(bodyParser.json())
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

