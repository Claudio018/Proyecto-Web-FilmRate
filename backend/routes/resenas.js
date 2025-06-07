const express = require('express');
const router = express.Router();
const Resena = require('../models/resena');
const Usuario = require('../models/usuario');

// Obtener reseñas por película
router.get('/:peliculaId/resenas', async (req, res) => {
  try {
    const resenas = await Resena.findAll({
      where: { peliculaId: req.params.peliculaId },
      include: [{ model: Usuario, attributes: ['nombre'] }]
    });
    const resultado = resenas.map(r => ({
      texto: r.texto,
      valoracion: r.valoracion,
      usuario: r.Usuario.nombre
    }));
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});

// Crear nueva reseña
router.post('/:peliculaId/resenas', async (req, res) => {
  const { texto, valoracion, usuarioRut } = req.body;
  try {
    const nuevaResena = await Resena.create({
      peliculaId: req.params.peliculaId,
      texto,
      valoracion,
      usuarioRut
    });
    res.json(nuevaResena);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la reseña' });
  }
});

module.exports = router;
