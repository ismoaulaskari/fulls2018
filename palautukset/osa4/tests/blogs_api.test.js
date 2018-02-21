const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const hogan = {
  'title': 'My life',
  'author': 'Hulk Hogan',
  'url': 'http://localhost',
  'likes': 0
}


describe('api level tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('posted blog is in db and returned with id', async () => {
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
  })

  afterAll(() => {
    server.close()
  })
})