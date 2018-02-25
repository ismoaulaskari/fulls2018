const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

  try {
    const user = await User.findById('5a91a7f2ba4dc514bc5921fa')
    blog.user = user._id

    const result = await blog.save()

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    response.status(201).json(Blog.format(result))
  }
  catch (error) {
    console.log(error)
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
