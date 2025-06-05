const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { nombre, rut, correo, region, comuna, contrasena } = req.body;

  console.log('Datos recibidos para registro:', req.body);

  if (!nombre || !rut || !correo || !region || !comuna || !contrasena) {
    return res.status(400).json({ error: 'Faltan campos requeridos para el registro' });
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    console.log('Password hasheada:', hashedPassword);

    const nuevoUsuario = await Usuario.create({
      nombre,
      rut,
      correo,
      region,
      comuna,
      contrasena: hashedPassword
    });

    console.log('Usuario creado:', nuevoUsuario);

    res.status(201).json({ mensaje: 'Usuario registrado', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ error: 'Error al registrar usuario', detalle: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  console.log('Datos recibidos para login:', req.body);

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Correo y contraseña son requeridos para login' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      console.log('Usuario no encontrado con correo:', correo);
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!validPassword) {
      console.log('Contraseña incorrecta para usuario:', correo);
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('Login exitoso para usuario:', correo);

    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el login', detalle: error.message });
  }
});

module.exports = router;
