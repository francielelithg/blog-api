const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const Sequelize = require("sequelize")
const config = require("../../../config/db")

const db = {}

console.log(config)

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  port: config.PORT,
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
  dialect: 'postgres',
  define: {
    timestamps: false,
    freezeTableName: true
  },
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

sequelize.authenticate()
  .then(() => {
    console.log('Connected to SQL database:', config.DB);
  })
  .catch(err => {
    console.error('Unable to connect to SQL database:', config.DB, err)
  })

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize)
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db