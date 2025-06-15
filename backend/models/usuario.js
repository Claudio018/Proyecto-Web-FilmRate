const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Usuario', {
    rut: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comuna: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fotoPerfil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    esModerador: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    suspendido: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    intentosFallidos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    bloqueadoHasta: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    tableName: 'Usuarios',
    timestamps: false,
  });
};
