const express = require('express');
const router = express.Router();
const { Usuario, Favorito } = require('../models');
const estadisticasRouter = require('./estadisticas');

// Obtener datos públicos del usuario (sin autenticación)
router.get('/:rut', async (req, res) => {
  try {
    const { rut } = req.params;
    const usuario = await Usuario.findOne({
      where: { rut },
      attributes: ['nombre', 'correo', 'region', 'comuna'] // o lo que quieras mostrar
    });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Obtener favoritos del usuario por rut
router.get('/:rut/favoritos', async (req, res) => {
  try {
    const { rut } = req.params;
    const favoritos = await Favorito.findAll({ where: { usuarioRut: rut } });
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.use('/:rut/estadisticas', estadisticasRouter);

module.exports = router;
