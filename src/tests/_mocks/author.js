jest.mock('../../main/models/author', () => () => {
	const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  const authorMock = dbMock.define('author')

  authorMock.$queueResult([
    authorMock.build({
      id: 1,
      firstName: 'Rita',
		  lastName: 'Hall',
		  email: 'ritahall@gmail.com',
		  birth: new Date('06/14/1995').toISOString()
    }),
    authorMock.build({
      id: 2,
      firstName: 'Lilian',
      lastName: 'Collins',
      email: 'liliancollins@gmail.com',
      birth: new Date('12/05/1999').toISOString()
    })
  ])

  return authorMock
})