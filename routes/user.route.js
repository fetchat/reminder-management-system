const express = require("express");
const userController = require('../controllers/user.controller.js')
const {validateInputs} = require("../middlewares/validate.js");
const userValidation = require("../validations/user.validation");

const router = express.Router();

router.post("/signup", validateInputs(userValidation.register),userController.signup);
router.post("/login", validateInputs(userValidation.login),userController.login);

module.exports = router;