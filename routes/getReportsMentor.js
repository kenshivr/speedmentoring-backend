const express = require('express');
const { getReportBySesionId, setReportBySesionId } = require('../controllers/getReportsMentorController').default;

const router = express.Router();

router.get('/reporte/:sesionId', getReportBySesionId);
router.post('/reporte/:sesionId', setReportBySesionId); // Cambiado de PUT a POST

module.exports = router;