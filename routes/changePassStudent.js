const express = require('express');
const { changePass } = require('../controllers/changePassStudent');
const router = express.Router();

router.put('/changePassStudent', changePass);

module.exports = router;