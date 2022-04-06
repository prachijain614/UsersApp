var express = require("express");
var router = express.Router();

let AuthRouter = require("./auth/router");
let UserRouter = require("./user/router");

router.use("", AuthRouter);
router.use("/users", UserRouter);

module.exports = router;
