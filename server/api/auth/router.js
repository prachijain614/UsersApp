const express = require("express");
const validate = require("../../middleware/validate");
const router = express.Router();
const controller = require("./controller");
const { loginSchema, signupSchema } = require("./schema");

/** Here validate middleware is called to validate parameters */
router.post("/signup", validate(signupSchema), controller.signup);
router.post("/login", validate(loginSchema), controller.login);

module.exports = router;
