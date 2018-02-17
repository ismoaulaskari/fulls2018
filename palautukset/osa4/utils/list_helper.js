const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue.likes
  let total = blogs.reduce(reducer, 0)
  return total
}

module.exports = {
  dummy,totalLikes
}