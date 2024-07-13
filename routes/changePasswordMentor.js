const express = require('express');
const { changePass } = require('../controllers/changePasswordMentorController').default;
const router = express.Router();

router.put('/changePassMentor', changePass);

module.exports = router;