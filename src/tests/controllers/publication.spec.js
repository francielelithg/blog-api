const author = require('../../main/services/author')
const request = require('supertest')
const api = `http://localhost:3000`

describe('publication controller', () => {
  let publicationId
  let authorId

  test('POST/ create', async (done) => {
    request(api)
      .post('/publication')
      .send({
        title: 'My test post',
        body: 'This is my test post on blog.',
        authorId: 4
      })
      .then(response => {
        if (response.body.id) publicationId = response.body.id
        expect(typeof response.body.id).toBe('number')
        expect(response.body.title).toEqual('My test post')
        done()
      })
  })

  test('GET/ getById', async (done) => {
    request(api)
      .get(`/publication/${publicationId}`)
      .expect(200)
      .then(response => {
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
        expect(response.body).toEqual(1)
        done()
      })
  })
})