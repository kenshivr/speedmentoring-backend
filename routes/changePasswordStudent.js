const express = require('express');
const { changePass } = require('../controllers/changePasswordStudent');
const router = express.Router();

router.put('/changePassStudent', changePass);

module.exports = router;