const { publication } = require("../models")

module.exports.getAll = () => {
  return new Promise((resolve, reject) => {
    publication.findAll()
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
