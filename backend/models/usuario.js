
const { DataTypes } = require('sequelize');
const sequelize = require('./index');  

const Usuario = sequelize.define('Usuario', {
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
  }
}, {
  tableName: 'Usuarios',
  timestamps: false,
});

module.exports = Usuario;
