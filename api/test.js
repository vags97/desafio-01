const { expect, describe, it } = require('@jest/globals')
const server = require('./app.js')
const supertest = require('supertest')
const request = supertest(server)
const path = require('path')

const credentials = {
  email: 'example@example.com',
  password: '123456'
}

describe('Home Info', () => {
  it('GET / home info', async () => {
    const res = await request.get('/')
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('welcome')
    expect(res.body).toHaveProperty('stack')
    expect(res.body).toHaveProperty('details')
    expect(res.body).toHaveProperty('steps')
  })
})

describe('Credits', () => {
  it('GET /credits developers credits', async () => {
    const res = await request.get('/credits')
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    const developers = res.body
    expect(developers).toBeInstanceOf(Array)
    expect(developers.length).toBeGreaterThanOrEqual(1)
    developers.forEach((developer) => {
      expect(developer).toMatchSnapshot({
        id: expect.any(Number),
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        linkedin: expect.any(String),
        github: expect.any(String)
      })
    })
  })
})

describe('Login', () => {
  it('POST /login user login', async () => {
    const res = await request.post('/login')
      .send({
        email: credentials.email,
        password: credentials.password
      })

    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('msg')
    expect(res.body).toHaveProperty('tokens')
    expect(res.body.tokens).toHaveProperty('accessToken')
    expect(res.body.tokens).toHaveProperty('refreshToken')
  })
  it('POST /login user login wrong email', async () => {
    const res = await request.post('/login')
      .send({
        email: 'example1@example.cl',
        password: credentials.password
      })
    expect(res.status).toEqual(404)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('msg')
    expect(res.body).toHaveProperty('error')
  })
})

describe('Files Without Login', () => {
  it('POST /file upload file without login', async () => {
    const res = await request.post('/file')
    expect(res.status).toEqual(401)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('msg')
  })
  it('GET /file files without login', async () => {
    const res = await request.get('/file')
    expect(res.status).toEqual(401)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('msg')
  })
  it('GET /event event info without login', async () => {
    const res = await request.get('/event/45')
    expect(res.status).toEqual(401)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('msg')
  })
  it('GET /file upload with login', async () => {
    const authRes = await request.post('/login')
      .send({
        email: credentials.email,
        password: credentials.password
      })
    const { accessToken } = authRes.body.tokens
    const res = await request.post('/file')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', path.resolve(__dirname, './tests/files/registro.csv'))
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('msg')
  })
})

async function login () {
  return await request.post('/login')
    .send({
      email: credentials.email,
      password: credentials.password
    })
}

describe('Files With Login', () => {
  it('GET /file upload with login', async () => {
    const authRes = await login()
    const { accessToken } = authRes.body.tokens
    const res = await request.post('/file')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', path.resolve(__dirname, './tests/files/registro.csv'))
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('msg')
    expect(res.body).toHaveProperty('id')
  })
  it('GET /file files with login', async () => {
    const authRes = await login()
    const { accessToken } = authRes.body.tokens
    const res = await request.get('/file')
      .set('Authorization', `Bearer ${accessToken}`)
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('msg')
    expect(res.body).toHaveProperty('events')
    const { events } = res.body
    expect(events).toBeInstanceOf(Array)
    expect(events.length).toBeGreaterThanOrEqual(1)
    events.forEach((event) => {
      expect(event).toMatchSnapshot({
        id: expect.any(Number),
        fileName: expect.any(String),
        createdAt: expect.any(String)
      })
    })
  })
  it('GET /event event info with login', async () => {
    const authRes = await login()
    const { accessToken } = authRes.body.tokens
    const res = await request.get('/event/1')
      .set('Authorization', `Bearer ${accessToken}`)
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining('json'))
    expect(res.body).toHaveProperty('msg')
    expect(res.body).toHaveProperty('event')
    expect(res.body.event).toMatchSnapshot({
      fileName: expect.any(String),
      assistantsPerCountry: expect.any(Array),
      createdAt: expect.any(String)
    })
    res.body.event.assistantsPerCountry.forEach((event) => {
      expect(event).toMatchSnapshot({
        country: expect.any(String),
        assistants: expect.any(Number)
      })
    })
  })
})
