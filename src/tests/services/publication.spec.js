const publicationMock = require('../_mocks/publication')
const publication = require('../../main/services/publication')

jest.fn(publicationMock)

describe('publication service', () => {
  test('getAll', async () => {
    const result = await publication.getAll()
    expect(typeof result).toBe('object')
    expect(result.length).toBe(2)
  })

  test('getById', async () => {
    const result = await publication.getById(1)
    const data = JSON.parse(JSON.stringify(result))
    expect(data.id).toEqual(1)
  })
	
  test('create', async () => {
    const data = { 
      title: 'My third post',
		  body: 'This is my third post on blog.',
		  authorId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    const result = await publication.create(data)
    expect(result.title).toEqual('My third post')
    expect(typeof result.id).toBe('number')
  })

  test('update', async () => {
    const data = { 
      title: 'My second post'
    }
    const result = await publication.update(1, data)
    expect(result[0]).toEqual(1)
  })

  test('delete', async () => {
    const result = await publication.delete(1)
    expect(result).toEqual(1)
  })
})
