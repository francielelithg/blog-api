const service = require('../services/publication')

module.exports.getAllPublications = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  const query = event.queryStringParameters
  service.getAll(query)
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
        body: 'Could not find publications: ' + e
      })
    })
}

module.exports.getPublication = (event, context, callback) => {
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
        body: "Could not find publication: " + e
      })
    })
}

module.exports.createPublication = (event, context, callback) => {
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
        body: "Could not create publication " + e
      })
    }) 
}

module.exports.updatePublication = (event, context, callback) => {
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
        body: "Could not update publication" + e
      })
    }) 
}

module.exports.deletePublication = (event, context, callback) => {
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
        body: "Could not delete Publication" + e
      })
    }) 
}
