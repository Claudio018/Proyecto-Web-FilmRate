const express = require('express');
const cors = require('cors');
require('dotenv').config();

//xd falta agregar las demas
const { sequelize, Usuario, Resena } = require('./models');

// rutas
const authRoutes = require('./routes/auth');
const resenaRoutes = require('./routes/resenas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/peliculas', resenaRoutes);

app.get('/', (req, res) => {
  res.send('se conecto a bd');
});

// sincronizar con bd
sequelize.sync({ force: false }) 
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
