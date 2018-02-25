const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map(Blog.format))
  }
  catch (error) {
    console.log(error)
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog(request.body)
    if (!blog.title) {
      return response.status(400).json({ error: 'title missing' })
    }
    if (!blog.url) {
      return response.status(400).json({ error: 'url missing' })
    }
    if (!blog.likes) {
      blog.likes = 0
    }

    const user = await User.findById(decodedToken.id)
    blog.user = user._id

    const result = await blog.save()

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    response.status(201).json(Blog.format(result))
  }
  catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})


blogsRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const removable = await Blog.findById(id)
    if (!removable) {
      return response.status(404)
    }
    await Blog.remove(removable)
    response.status(204).end()
  } catch (error) {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  }
})


module.exports = blogsRouter
