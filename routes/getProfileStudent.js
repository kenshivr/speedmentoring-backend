// routes/getProfileStudent.js

const express = require("express");
const { getStudent, updateStudentEspecialidad } = require("../controllers/getProfileStudent").default;
const router = express.Router();

router.get("/getStudent/:id", getStudent);
router.put("/updateStudent/:id", updateStudentEspecialidad);

module.exports = router;