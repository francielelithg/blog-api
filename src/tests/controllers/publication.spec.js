const publicationMock = require('../_mocks/publication')
const publication = require('../../main/services/publication')
const request = require('supertest')
const api = `http://localhost:3000`

describe('publication controller', () => {
  let publicationId

  test('GET/ getAll', async (done) => {
    request(api)
      .get('/publication')
      .expect(200)
      .then(response => {
        expect(typeof response.body).toBe('object')
        done()
      })
  })

  test('GET/ getById', async (done) => {
    request(api)
      .get('/publication/2')
      .expect(200)
      .then(response => {
        expect(response.body.title).toEqual('My first publication')
        done()
      })
  })

  test('POST/ create', async (done) => {
    const data = {
      firstName: 'Franciele',
		  lastName: 'Lithg',
		  email: 'francielelithg@gmail.com',
		  birth: new Date('06/14/1995').toISOString()
    }
    request(api)
      .post('/publication')
      .send({
        title: 'My test post',
        body: 'This is my test post on blog.',
        authorId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .then(response => {
        if (response.body.id) publicationId = response.body.id
        expect(typeof response.body.id).toBe('number')
        expect(response.body.title).toEqual('My test post')
        done()
      })
  })

  test('PUT/ update', async (done) => {
    request(api)
      .put(`/publication/${publicationId}`)
      .set('Content-Type', 'application/json')
      .send({
		    title: 'Test post',
      })
      .expect(200)
      .then(response => {
        expect(response.body[0]).toEqual(1)
        done()
      })
  })

  test('DELETE/ delete', async (done) => {
    jest.setTimeout(20000)
    request(api)
      .delete(`/publication/${publicationId}`)
      .expect(200)
      .then(response => {
        console.log(response.body)
        expect(response.body).toEqual(1)
        done()
      })
  })
})