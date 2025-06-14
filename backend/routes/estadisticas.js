const express = require('express');
const router = express.Router({ mergeParams: true }); 
const { EstadisticaUsuario } = require('../models');

// 👉 GET: obtener estadísticas de un usuario
router.get('/', async (req, res) => {
  try {
    const { rut } = req.params; // viene del router padre
    console.log('RUT recibido:', rut);
    const estadisticas = await EstadisticaUsuario.findByPk(rut);

    if (!estadisticas) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado o sin estadísticas' });
    }

    res.json(estadisticas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
