const express = require('express');
const { getEspecialties } = require('../controllers/getEspecialtiesAdminController');
const router = express.Router();

router.get('/especialidades', getEspecialties);

module.exports = router;