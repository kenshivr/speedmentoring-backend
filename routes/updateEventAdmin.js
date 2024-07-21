const express = require('express');
const router = express.Router();
const { updateEvent } = require('../controllers/updateEventAdmin');

// Ruta para actualizar el perfil del usuario
router.post('/updateEvent/:eventId', updateEvent);

module.exports = router;