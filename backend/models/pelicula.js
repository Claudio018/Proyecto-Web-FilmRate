const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Pelicula', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Peliculas',
    timestamps: false
  });
};
