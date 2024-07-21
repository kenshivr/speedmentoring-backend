const express = require('express');
const { getEspecialties } = require('../controllers/getSpecialtiesAdmin');
const router = express.Router();

router.get('/especialidades', getEspecialties);

module.exports = router;