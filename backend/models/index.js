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
const Pelicula = require('./pelicula')(sequelize);
const Favorito = require('./favorito')(sequelize);
const Seguidor = require('./seguidores')(sequelize);
const LikeResena = require('./likeResena')(sequelize);

// Relaciones con borrado en cascada
Usuario.hasMany(Resena, { foreignKey: 'usuarioRut', onDelete: 'CASCADE' });
Resena.belongsTo(Usuario, { foreignKey: 'usuarioRut', onDelete: 'CASCADE' });

Pelicula.hasMany(Resena, { foreignKey: 'peliculaId', onDelete: 'CASCADE' });
Resena.belongsTo(Pelicula, { foreignKey: 'peliculaId', onDelete: 'CASCADE' });

Usuario.belongsToMany(Pelicula, { 
  through: Favorito, 
  foreignKey: 'usuarioRut', 
  otherKey: 'peliculaId', 
  onDelete: 'CASCADE' 
});
Pelicula.belongsToMany(Usuario, { 
  through: Favorito, 
  foreignKey: 'peliculaId', 
  otherKey: 'usuarioRut', 
  onDelete: 'CASCADE' 
});

Usuario.belongsToMany(Usuario, {
  through: Seguidor,
  as: 'Siguiendo',
  foreignKey: 'seguidorRut',
  otherKey: 'seguidoRut',
  onDelete: 'CASCADE',
});
Usuario.belongsToMany(Usuario, {
  through: Seguidor,
  as: 'Seguidores',
  foreignKey: 'seguidoRut',
  otherKey: 'seguidorRut',
  onDelete: 'CASCADE',
});

Usuario.belongsToMany(Resena, {
  through: LikeResena,
  as: 'ResenasLikeadas',
  foreignKey: 'usuarioRut',
  otherKey: 'resenaId',
  onDelete: 'CASCADE',
});
Resena.belongsToMany(Usuario, {
  through: LikeResena,
  as: 'UsuariosQueDieronLike',
  foreignKey: 'resenaId',
  otherKey: 'usuarioRut',
  onDelete: 'CASCADE',
});

module.exports = {
  sequelize,
  Usuario,
  Resena,
  Pelicula,
  Favorito,
  Seguidor,
  LikeResena
};
