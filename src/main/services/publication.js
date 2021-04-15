const { author, publication } = require("../models")
const Sequelize = require("sequelize")

const Op = Sequelize.Op

module.exports.getAll = (query) => {
  return new Promise((resolve, reject) => {
    let options = {}

    if (query) {
      if (query.title) {
        const title = {
          [Op.iLike]: query.title
        }
        delete query.title
        options.where = { title }
      } else {
        options.where = query
      }
    }

    options = {
      ...options,
      include: author,
      limit: query ? query.limit : null,
      offset: query ? query.offset : null,
      order: [['createdAt', 'DESC']]
    }

    publication.findAndCountAll(options)
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
    publication.findOne({ where: { id: id }, include: author })
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
