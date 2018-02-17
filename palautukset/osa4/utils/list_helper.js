const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue.likes
  let total = blogs.reduce(reducer, 0)
  return total
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }
  return blogs.reduce(reducer, {})
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}