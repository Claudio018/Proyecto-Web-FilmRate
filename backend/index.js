const express = require('express');
const cors = require('cors');
require('dotenv').config();

//xd falta agregar las demas
const sequelize = require('./models');
const Usuario = require('./models/usuario');

// rutas
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

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
