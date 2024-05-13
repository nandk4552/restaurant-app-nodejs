const express = require("express");
const { testController } = require("../controllers/testController");

// router object
const router = express.Router();

// routes
// /test-user | GET
router.get("/test-user", testController);

//export

module.exports = router;
