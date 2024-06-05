const express = require('express');
const router = express.Router();
const apiClient = require('../api'); // REVISAR LA RUTA DE api.js

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const response = await apiClient.post('/login', {
      username: req.body.username,
      password: req.body.password,
    });
    req.session.user = response.data.user;
    res.redirect('/');
  } catch (error) {
    res.status(401).send('Login failed');
  }
});

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const response = await apiClient.post('/register', {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    res.redirect('/login');
  } catch (error) {
    res.status(400).send('Registration failed');
  }
});

module.exports = router;
