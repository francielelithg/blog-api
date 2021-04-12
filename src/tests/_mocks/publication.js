jest.mock('../../main/models/publication', () => () => {
	const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  const publicationMock = dbMock.define('publication')

  publicationMock.$queueResult([
    publicationMock.build({
      id: 1,
      title: 'My first post',
		  body: 'This is my first post on blog.',
		  authorId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }),
    publicationMock.build({
      id: 1,
      title: 'My second post',
		  body: 'This is my second post on blog.',
		  authorId: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }),
  ])

  return publicationMock
})