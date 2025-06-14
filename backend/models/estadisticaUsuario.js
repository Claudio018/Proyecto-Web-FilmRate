const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('EstadisticaUsuario', {
    usuarioRut: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'Usuarios',
        key: 'rut'
      }
    },
    cantidadFavoritos: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    cantidadComentarios: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    cantidadSeguidores: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    cantidadSiguiendo: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    cantidadResenas: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'EstadisticasUsuarios',
    timestamps: false
  });
};
