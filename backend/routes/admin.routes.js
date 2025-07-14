const express = require("express");
const router = express.Router();

const AdminControllers = require("../controllers/admin.controllers");

router.post("/", AdminControllers.createAdmin);
router.post("/auth", AdminControllers.authorization);
router.post("/otp", AdminControllers.isVerified);
router.get("/", AdminControllers.getAll);

module.exports = router;
