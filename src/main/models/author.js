module.exports = (sequelize, Sequelize) => {
  var Model = sequelize.define('author', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id'
    },
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      field: 'last_name'
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      field: 'email'
    },
    birth: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      field: 'birth'
    }
  })

  Model.associate = models => {
    Model.hasMany(models.publication, {
      foreignKey: 'id',
      otherKey: 'author_id',
      onDelete: 'CASCADE'
    })
  }

  return Model
}