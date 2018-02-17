const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

describe('total likes', () => {

  const listWithZeroBlogs = []
  const listWithOneBlog = [blogs[0]]
  const listWithManyBlogs = blogs

  test('when list has no blogs likes equal zero', () => {
    const result = listHelper.totalLikes(listWithZeroBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('when list has many blogs equals the likes of their sum', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})
