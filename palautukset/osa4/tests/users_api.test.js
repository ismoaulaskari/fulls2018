const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')

const testUser =
  {
    'username': 'test',
    'name': 'Test User',
    'password': 'alskedjq',
    'adult': false
  }

const someBody =
  {
    'username': 'jj',
    'name': 'J. Jokunen',
    'password': 'assassasa',
    'adult': true
  }

const shortPassword =
  {
    'username': 'dull',
    'name': 'LAzy Boy',
    'password': '',
    'adult': true
  }

const noAdult =
  {
    'username': 'boy',
    'name': 'Teen Age',
    'password': 'asadoasoow'
  }

describe('api level user tests', () => {
  beforeAll(async () => {
    await User.remove({})
    const initialUsers = [testUser]

    const userObjects = initialUsers.map(n => new User(n))
    await Promise.all(userObjects.map(n => n.save()))
  })

  test('there are users in the db', async () => {
    const postresponse = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const responseuser = postresponse.body    
    expect(responseuser[0].id).toBeDefined()
  })


  test('good user can be added', async () => {
    const postresponse = await api
      .post('/api/users')
      .send(someBody)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const responseuser = postresponse.body
    expect(responseuser._id).toBeDefined()
  })

  test('duplicate user cannot be added', async () => {
    const postresponse = await api
      .post('/api/users')
      .send(testUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = postresponse.body
    console.log(postresponse.body)
    expect(response.error).toBe('username already exists')
  })

  test('password must have 3 chars', async () => {
    const postresponse = await api
      .post('/api/users')
      .send(shortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = postresponse.body
    expect(response.error).toBe('password too short')
  })

  test('missing age is adult', async () => {
    const postresponse = await api
      .post('/api/users')
      .send(noAdult)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const responseUser = postresponse.body
    expect(responseUser.adult).toBe(true)
  })



  afterAll(() => {
    server.close()
  })
})