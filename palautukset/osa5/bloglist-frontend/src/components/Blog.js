import React from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, all }) => {

  if (all) {
    return (
      <div style={blogStyle}>
        {blog.author}: {blog.title} <a href={blog.url}>{blog.url}</a> {blog.likes} likes
      </div>
    )
  }
  else {
    return (
      <div style={blogStyle}>
        {blog.author}: {blog.title}
      </div>
    )
  }
}

export default Blog