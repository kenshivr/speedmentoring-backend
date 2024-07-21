const express = require("express");
const { getStudent, updateStudent } = require("../controllers/getProfileStudent.js");
const router = express.Router();

router.get("/getStudent/:id", getStudent);

router.post("/updateStudent/:id", updateStudent);

module.exports = router;