const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Resena', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    peliculaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    valoracion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuarioRut: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Resenas',
    timestamps: true
  });
};
