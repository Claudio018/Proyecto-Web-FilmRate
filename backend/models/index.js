const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// Conexión
sequelize.authenticate()
  .then(() => console.log('Se conectó a la BD'))
  .catch(err => console.error('No se conectó a BD', err));

// Modelos
const Usuario = require('./usuario')(sequelize);
const Resena = require('./resena')(sequelize);

// Relaciones
Resena.belongsTo(Usuario, { foreignKey: 'usuarioRut' });
Usuario.hasMany(Resena, { foreignKey: 'usuarioRut' });

module.exports = {
  sequelize,
  Usuario,
  Resena
};
