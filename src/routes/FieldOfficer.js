const express = require("express");
const router = express.Router();

const { postFieldOfficer } = require("../controllers/fieldOfficer");

router.post("/post-field-officer", postFieldOfficer);

module.exports = router;
