const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'The one',
    'author': 'Mr. Brns',
    'url': 'http://null',
    'likes': 3
  },
  {
    'title': 'We are the people of',
    'author': 'Potus',
    'url': 'ftp://127.0.0.1',
    'likes': 7
  },
  {
    'title': 'Do not read',
    'author': 'Mac Gyver',
    'url': 'https://helsinki.fi',
    'likes': 1
  }
]

const format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  }
}

const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

module.exports = {
  initialBlogs, format, nonExistingId, blogsInDb
}
