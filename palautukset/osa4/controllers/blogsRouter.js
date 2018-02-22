const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(formatBlog))
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
    const result = await blog.save()
    response.status(201).json(formatBlog(result))
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
