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
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
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

  const result = await blog.save()
  response.status(201).json(formatBlog(result))
})

module.exports = blogsRouter
