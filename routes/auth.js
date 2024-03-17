const express = require("express");

const validateBody = require("../helpers/validateBody");
const { schemas } = require("../models/users");
const ctrl = require("../controllers/auth");

const router = express.Router();

//sign up
router.post("/register",  ctrl.register);

module.exports = router;
