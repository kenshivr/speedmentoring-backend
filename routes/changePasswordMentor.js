const express = require('express');
const { changePass } = require('../controllers/changePasswordMentorController');
const router = express.Router();

router.put('/changePassMentor', changePass);

module.exports = router;