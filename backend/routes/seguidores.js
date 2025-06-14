const express = require('express');
const router = express.Router();
const { Usuario, Seguidor, EstadisticaUsuario } = require('../models');
const authenticateToken = require('../middleware/authenticateToken');

// 👉 POST: seguir a un usuario
router.post('/seguir/:rutDestino', authenticateToken, async (req, res) => {
  try {
    const rutOrigen = req.usuario.rut;
    const rutDestino = req.params.rutDestino;

    if (rutOrigen === rutDestino) {
      return res.status(400).json({ mensaje: 'No puedes seguirte a ti mismo' });
    }

    // Crear relación
    await Seguidor.create({ seguidorRut: rutOrigen, seguidoRut: rutDestino });

    // Actualizar estadísticas
    await EstadisticaUsuario.increment('cantidadSiguiendo', { where: { usuarioRut: rutOrigen } });
    await EstadisticaUsuario.increment('cantidadSeguidores', { where: { usuarioRut: rutDestino } });

    res.json({ mensaje: 'Ahora sigues al usuario' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 👉 DELETE: dejar de seguir
router.delete('/seguir/:rutDestino', authenticateToken, async (req, res) => {
  try {
    const rutOrigen = req.usuario.rut;
    const rutDestino = req.params.rutDestino;

    const resultado = await Seguidor.destroy({
      where: {
        seguidorRut: rutOrigen,
        seguidoRut: rutDestino
      }
    });

    if (resultado) {
      await EstadisticaUsuario.decrement('cantidadSiguiendo', { where: { usuarioRut: rutOrigen } });
      await EstadisticaUsuario.decrement('cantidadSeguidores', { where: { usuarioRut: rutDestino } });

      res.json({ mensaje: 'Has dejado de seguir al usuario' });
    } else {
      res.status(404).json({ mensaje: 'No seguías a este usuario' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
