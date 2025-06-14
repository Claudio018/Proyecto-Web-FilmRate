const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Seguidor', {
    seguidorRut: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'rut'
      }
    },
    seguidoRut: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'rut'
      }
    }
  }, {
    tableName: 'Seguidores',
    timestamps: false
  });
};
