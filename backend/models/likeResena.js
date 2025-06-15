const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('LikeResena', {
    usuarioRut: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    resenaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'like_resenas',
    timestamps: false
  });
};
