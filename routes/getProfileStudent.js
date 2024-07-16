const express = require("express");
const { getStudent } = require("../controllers/getProfileStudent");
const router = express.Router();

router.get("/getStudent/:id", getStudent);

export default router;