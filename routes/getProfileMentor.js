const express = require("express");
const { getProfileMentor } = require("../controllers/getProfileMentor");
const router = express.Router();

router.get("/getProfileMentor/:id", getProfileMentor);

module.exports = router;