const express = require("express");
const { getSpecialties } = require("../controllers/specialtiesController").default;
const router = express.Router();

router.get("/getSpecialties", getSpecialties);

module.exports = router;