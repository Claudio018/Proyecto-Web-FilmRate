const express = require('express');
const router = express.Router();
const { Resena, Usuario, Pelicula } = require('../models');
const authenticateToken = require('../middleware/authenticateToken');

// Obtener reseñas por película
router.get('/:peliculaId/resenas', async (req, res) => {
  try {
    const resenas = await Resena.findAll({
      where: { peliculaId: req.params.peliculaId },
      include: [{ model: Usuario, attributes: ['nombre'] }]
    });

    const resultado = resenas.map(r => ({
      id: r.id,  
      texto: r.texto,
      valoracion: r.valoracion,
      usuario: r.Usuario.nombre,
      createdAt: r.createdAt
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});

router.get('/todas', async (req, res) => {
  try {
    const resenas = await Resena.findAll({
      include: [
        { model: Usuario, attributes: ['nombre'] }
      ],
      order: [['updatedAt', 'DESC']]
    });

    const resultado = resenas.map(r => ({
      id: r.id,
      peliculaId: r.peliculaId,
      texto: r.texto,
      valoracion: r.valoracion,
      usuario: r.Usuario.nombre,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});


// Crear nueva reseña y película si no existe
router.post('/:peliculaId/resenas', authenticateToken, async (req, res) => {
  const { texto, valoracion, titulo } = req.body;
  const peliculaId = req.params.peliculaId;

  try {
    // si no existe la pelicula se crea
    await Pelicula.findOrCreate({
      where: { id: peliculaId },
      defaults: { titulo }
    });

    const usuarioRut = req.user.rut;

    // Crear la reseña con el rut del usuario autenticado
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
