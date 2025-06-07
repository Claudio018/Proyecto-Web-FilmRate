const express = require('express');
const router = express.Router();
const { Resena, Usuario, Pelicula } = require('../models'); // Importa desde index.js

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
    console.error(error);
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});

// Crear nueva reseña y película si no existe
router.post('/:peliculaId/resenas', async (req, res) => {
  const { texto, valoracion, usuarioRut, titulo } = req.body;
  const peliculaId = req.params.peliculaId;

  try {
    // Asegura que la película exista
    await Pelicula.findOrCreate({
      where: { id: peliculaId },
      defaults: { titulo }
    });

    // Crea la reseña
    const nuevaResena = await Resena.create({
      peliculaId,
      texto,
      valoracion,
      usuarioRut
    });

    res.status(201).json(nuevaResena);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la reseña' });
  }
});

module.exports = router;
