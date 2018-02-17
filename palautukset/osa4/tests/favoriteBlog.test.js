const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

describe('favorite blog', () => {

  const listWithZeroBlogs = []
  const listWithOneBlog = [blogs[0]]
  const listWithManyBlogs = blogs

  test('when list has no blogs finds nothing ok', () => {
    const result = listHelper.favoriteBlog(listWithZeroBlogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog finds it', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toBe(blogs[0])
  })

  test('when list has many blogs finds the best', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toBe(blogs[2])
  })
})
