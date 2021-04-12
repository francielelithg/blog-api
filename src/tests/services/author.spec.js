const authorMock = require('../_mocks/author')
const author = require('../../main/services/author')

jest.fn(authorMock)

describe('author service', () => {
  test('getAll', async () => {
    const result = await author.getAll()
    expect(typeof result).toBe('object')
    expect(result.length).toBe(2)
  })

  test('getById', async () => {
    const result = await author.getById(1)
    const data = JSON.parse(JSON.stringify(result))
    expect(data.id).toEqual(1)
  })
	
  test('create', async () => {
    const data = { 
      firstName: 'Edlamar',
      lastName: 'Lithg',
      email: 'edlamarlithg@gmail.com',
      birth: new Date('08/05/1967').toISOString()
    }
    const result = await author.create(data)
    expect(result.firstName).toEqual('Edlamar')
    expect(typeof result.id).toBe('number')
  })

  test('update', async () => {
    const data = { 
      email: 'fran_lithg@live.com'
    }
    const result = await author.update(1, data)
    expect(result[0]).toEqual(1)
  })

  test('delete', async () => {
    const result = await author.delete(1)
    expect(result).toEqual(1)
  })
})
