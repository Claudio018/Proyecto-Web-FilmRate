const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Favorito', {
    usuarioRut: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Usuarios',
        key: 'rut'
      }
    },
    peliculaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Peliculas',
        key: 'id'
      }
    }
  }, {
    tableName: 'favoritos',
    timestamps: false
  });
};

