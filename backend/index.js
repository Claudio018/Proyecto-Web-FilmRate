const express = require('express');
const cors = require('cors');
require('dotenv').config();

//xd falta agregar las demas
const { sequelize, Usuario, Resena,Favorito } = require('./models');

// rutas
const authRoutes = require('./routes/auth');
const resenaRoutes = require('./routes/resenas');
const favoritosRouter = require('./routes/favoritos');
const usuarioRoutes = require('./routes/usuario');
const rutaSeguidores = require('./routes/seguidores');
const perfilRouter = require('./routes/perfil');
const likesResenaRoutes = require('./routes/likeResena');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/peliculas', resenaRoutes);
app.use('/favoritos', favoritosRouter);
app.use('/usuario', usuarioRoutes);
app.use('/api', rutaSeguidores);
app.use('/perfil', perfilRouter);
app.use('/peliculas/likes', likesResenaRoutes);

app.get('/', (req, res) => {
  res.send('se conecto a bd');
});

// sincronizar con bd
sequelize.sync({ alter: true })
  .then(() => {
    console.log('esta sincronizado');
  })
  .catch((err) => {
    console.error('error al sincronizar', err);
  });

// iniciar servidor
app.listen(PORT, () => {
  console.log(`funciona en http://localhost:${PORT}`);
});
