const express = require("express");
const router = express.Router();

const userRoute = require("./user/user.route")
router.use("/user", userRoute);

module.exports = router;