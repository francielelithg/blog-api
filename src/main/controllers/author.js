const service = require('../services/author')

module.exports.getAllAuthors = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  service.getAll()
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      console.log(e)
      callback(null, {
        statusCode: e.statusCode || 500,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: 'Could not find authors: ' + e
      })
    })
}

module.exports.getAuthor = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  service.getById(event.pathParameters.id)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: "Could not find author: " + e
      })
    })
}

module.exports.createAuthor = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  const data = JSON.parse(event.body)
  service.create(data)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: "Could not create author " + e
      })
    }) 
}

module.exports.updateAuthor = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  const data = JSON.parse(event.body)
  service.update(event.pathParameters.id, data)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: "Could not update author" + e
      })
    }) 
}

module.exports.deleteAuthor = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  service.delete(event.pathParameters.id)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: "Could not delete Author" + e
      })
    }) 
}
