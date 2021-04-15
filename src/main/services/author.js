const { author } = require("../models")

module.exports.getAll = () => {
  return new Promise((resolve, reject) => {
    author.findAll({
      order: [['firstName', 'ASC'], ['lastName', 'ASC']]
    })
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
    author.findOne({ where: { id: id } })
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
    author.create(data)
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
    author.update(data, { where: { id: id } })
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
    author.destroy({ where: { id: id } })
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
  })
}
