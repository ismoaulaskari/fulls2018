const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs')

  response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (!body.password || body.password.length < 3) {
      return response.status(400).json({ error: 'password too short' })
    }
    if (!body.username) {
      return response.status(400).json({ error: 'no username given' })
    }
    if (!('adult' in body)) {
      body.adult = true
    }

    const found = await User.find({ 'username': body.username })
    if (found) {
      if (found.constructor === Array && found.length > 0) {
        return response.status(400).json({ error: 'username already exists' })
      }
      if (found.username === body.username) {
        return response.status(400).json({ error: 'username already exists' })
      }
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter
