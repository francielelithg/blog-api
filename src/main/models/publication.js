module.exports = (sequelize, Sequelize) => {
  var Model = sequelize.define('publication', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: Sequelize.DataTypes.TEXT
    },
    authorId: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'author_id'
    },
    createdAt: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW,
      noUpdate : true,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW,
      field: 'updated_at'
    }
  })

  return Model
}