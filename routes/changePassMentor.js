const express = require('express');
const { changePass } = require('../controllers/changePassMentor.js');
const router = express.Router();

router.put('/changePassMentor', changePass);

module.exports = router;