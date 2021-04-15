const request = require('supertest')
const api = `http://localhost:3000`

describe('author controller', () => {
  let authorId

  test('GET/ getAll', async (done) => {
    request(api)
      .get('/author')
      .expect(200)
      .then(response => {
        expect(typeof response.body).toBe('object')
        done()
      })
  })

  test('POST/ create', async (done) => {
    request(api)
      .post('/author')
      .send({
        firstName: 'Rita',
		    lastName: 'Hall',
        email: 'ritahall@gmail.com',
        birth: new Date('08/05/1967').toISOString()
      })
      .then(response => {
        if (response.body.id) authorId = response.body.id
        expect(typeof response.body.id).toBe('number')
        expect(response.body.firstName).toEqual('Rita')
        done()
      })
  })

  test('GET/ getById', async (done) => {
    request(api)
      .get(`/author/${authorId}`)
      .expect(200)
      .then(response => {
        expect(response.body.firstName).toEqual('Rita')
        done()
      })
  })

  test('PUT/ update', async (done) => {
    request(api)
      .put(`/author/${authorId}`)
      .set('Content-Type', 'application/json')
      .send({
		    email: 'emailsuer@live.com',
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
      .delete(`/author/${authorId}`)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(1)
        done()
      })
  })
})