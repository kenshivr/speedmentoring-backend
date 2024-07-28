const express = require('express');
const { getEspecialties, getEspecialidad, updateEspecialidad, createEspecialidad } = require('../controllers/getSpecialtiesAdmin');
const router = express.Router();

router.get('/especialidades', getEspecialties);

router.get('/especialidad/:id', getEspecialidad);

router.put('/updateSpecialty/:id', updateEspecialidad);

router.post('/createSpecialty', createEspecialidad);

module.exports = router;