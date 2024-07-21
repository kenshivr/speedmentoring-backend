const express = require('express');
const { getReportBySesionId, setReportBySesionId } = require('../controllers/getReportsMentor');

const router = express.Router();

router.get('/reporte/:sesionId', getReportBySesionId);
router.post('/reporte/:sesionId', setReportBySesionId);

module.exports = router;