const express = require('express');
const { getReportBySesionId, setReportBySesionId } = require('../controllers/getReportsStudentController');

const router = express.Router();

router.get('/getReportStudent/:sesionId', getReportBySesionId);
router.post('/setReportStudent/:sesionId', setReportBySesionId);

module.exports = router;