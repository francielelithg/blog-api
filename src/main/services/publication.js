const { author, publication } = require("../models")

module.exports.getAll = (query) => {
  return new Promise((resolve, reject) => {
    let options = {}

    if (query) {
      if (query.limit) {
        options.limit = query.limit
        delete query.limit
      }

      if (query.offset) {
        options.limit = query.offset
        delete query.offset
      }

      options.where = query
    }

    options = {
      ...options,
      include: author
    }

    publication.findAll(options)
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    publication.findOne({ where: { id: id } })
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports.create = (data) => {
  return new Promise((resolve, reject) => {
    publication.create(data)
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports.update = (id, data) => {
  return new Promise((resolve, reject) => {
    publication.update(data, { where: { id: id } })
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    publication.destroy({ where: { id: id } })
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}
