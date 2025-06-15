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


// Relaciones
Usuario.hasMany(Resena, { foreignKey: 'usuarioRut' });
Resena.belongsTo(Usuario, { foreignKey: 'usuarioRut' });

Pelicula.hasMany(Resena, { foreignKey: 'peliculaId' });
Resena.belongsTo(Pelicula, { foreignKey: 'peliculaId' });

Usuario.belongsToMany(Pelicula, { through: Favorito, foreignKey: 'usuarioRut', otherKey: 'peliculaId' });
Pelicula.belongsToMany(Usuario, { through: Favorito, foreignKey: 'peliculaId', otherKey: 'usuarioRut' });



Usuario.belongsToMany(Usuario, {
  through: Seguidor,
  as: 'Siguiendo',
  foreignKey: 'seguidorRut',
  otherKey: 'seguidoRut'
});
Usuario.belongsToMany(Usuario, {
  through: Seguidor,
  as: 'Seguidores',
  foreignKey: 'seguidoRut',
  otherKey: 'seguidorRut'
});

Usuario.belongsToMany(Resena, {
  through: LikeResena,
  as: 'ResenasLikeadas',
  foreignKey: 'usuarioRut',
  otherKey: 'resenaId'
});

Resena.belongsToMany(Usuario, {
  through: LikeResena,
  as: 'UsuariosQueDieronLike',
  foreignKey: 'resenaId',
  otherKey: 'usuarioRut'
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
