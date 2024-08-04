const express = require('express');
const { getSesion, updateSesion } = require('../controllers/getSesionMentor');
const router = express.Router();

router.get('/getSesionMentor/:sesionId', getSesion);
router.put('/putSesionMentor/:sesionId', updateSesion);

module.exports = router;