const express = require("express");
const { getSpecialty } = require("../controllers/getSpecialtyStudent");
const router = express.Router();

router.get("/getSpecialties/:userId", getSpecialty);

module.exports = router;