const express = require("express");
const router = express.Router();
const controller = require("./controller");
const auth = require("../../middleware/auth");

/** Here, auth middleware is called to authenticate user */
router.get("/", auth, controller.getUsers);
router.post("/:id", auth, controller.editUser);

module.exports = router;
