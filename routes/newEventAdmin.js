const express = require('express');
const router = express.Router();
const { newEventAdmin } = require('../controllers/newEventAdmin');

// Ruta para agregar un nuevo evento
router.post('/newEventAdmin', newEventAdmin);

module.exports = router;