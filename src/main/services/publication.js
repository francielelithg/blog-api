const Publication = require("../models").publication

module.exports.getAll = () => {
  return new Promise((resolve, reject) => {
    Publication.findAll()
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
    Publication.findByPk(id)
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
    Publication.create(data)
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
    Publication.update(data, { where: { id: id } })
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
    Publication.destroy({ where: { id: id } })
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}
