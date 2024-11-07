const express = require("express");
const router = express.Router();

const userController = require("../../controller/user/user.controller");
const checkValidation = require("../../services/validator.service");
const validate = require("../../validation/user/user.validation");

router.post("/signUp", validate.userSignUp(), checkValidation, userController.signUp);
router.post("/login", validate.userLogin(), checkValidation, userController.login);

module.exports = router;