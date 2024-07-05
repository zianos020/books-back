const express = require("express");
const { register, signin } = require("../controller/user");
const { validation, registervalidation, loginValidation } = require("../middlewear/validator");
const isAuth = require("../middlewear/isAuth");

const router = express.Router();

// Register
router.post("/register", registervalidation(), validation, register);

// Sign in
router.post("/signin", loginValidation(), validation, signin);

// Current user
router.get("/current", isAuth, (req, res) => {
    res.send("You are authorized");
});

module.exports = router;
