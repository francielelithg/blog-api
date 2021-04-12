jest.mock('../../main/models/author', () => () => {
	const SequelizeMock = require('sequelize-mock')
  const dbMock = new SequelizeMock()

  const authorMock = dbMock.define('author')

  authorMock.$queueResult([
    authorMock.build({
      id: 1,
      firstName: 'Franciele',
		  lastName: 'Lithg',
		  email: 'francielelithg@gmail.com',
		  birth: new Date('06/14/1995').toISOString()
    }),
    authorMock.build({
      id: 2,
      firstName: 'Lilian',
      lastName: 'Lithg',
      email: 'lilianlithg@gmail.com',
      birth: new Date('12/05/2008').toISOString()
    })
  ])

  return authorMock
})