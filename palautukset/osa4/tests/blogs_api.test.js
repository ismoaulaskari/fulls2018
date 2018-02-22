const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helper')

const hogan = {
  'title': 'My life',
  'author': 'Hulk Hogan',
  'url': 'http://localhost',
  'likes': 0
}

const broken = {
  'title': '',
  'author': 'Jake the Snake',
  'url': '',
  'likes': 0
}

const nolikes = {
  'title': 'Unhappy',
  'author': 'Evilness',
  'url': 'https://foo.bar',
}

describe('console', () => {
  it('logs to the console', () => {
    console.log('testing console log')
  })
})

describe('api level tests', () => {
  beforeEach(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(n => new Blog(n))
    await Promise.all(blogObjects.map(n => n.save()))
  })

  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDb()
    expect(response.body.length).toBe(blogsAfter.length)
    const returnedContents = response.body.map(n => n.content)
    blogsAfter.forEach(blog => {
      expect(returnedContents).toContain(blog.content)
    })
  })

  test('posted blog is in db and returned with id', async () => {
    const blogsBefore = await blogsInDb()

    const postresponse = await api
      .post('/api/blogs')
      .send(hogan)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allblogs = await api.get('/api/blogs')
    const found = allblogs.body.find(r => r.title === hogan.title)
    expect(found.author).toContain(hogan.author)
    //expect(allblogs).toContainEqual(expect.objectContaining(postresponse.body))

    const responseblog = postresponse.body
    expect(responseblog.author).toContain(hogan.author)
    expect(responseblog.title).toContain(hogan.title)
    expect(responseblog.id).toBeDefined()

    const blogsAfter = await blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
  })

  test('posted blog with no likes gets 0 likes', async () => {
    const postresponse = await api
      .post('/api/blogs')
      .send(nolikes)

    const responseblog = postresponse.body
    expect(responseblog.likes).toBe(0)
  })

  test('broken blog gets 400 as response', async () => {
    await api
      .post('/api/blogs')
      .send(broken)
      .expect(400)
  })


  afterAll(() => {
    server.close()
  })
})