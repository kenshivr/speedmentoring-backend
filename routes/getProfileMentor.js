const express = require("express");
const { getProfileMentor } = require("../controllers/getProfileMentor.js");
const router = express.Router();

router.get("/getProfileMentor/:id", getProfileMentor);

module.exports = router;