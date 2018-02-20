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

  test('posted blog is returned with id', async () => {
    const response = await api
      .post('/api/blogs')
      .send(hogan)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    //console.log(response)
    const contents = response.body.map(r => r.content)
    expect(contents).toContain('"id:"')
  })

  afterAll(() => {
    server.close()
  })
})