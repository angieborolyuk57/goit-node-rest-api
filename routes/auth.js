const express = require("express")

const validateBody = require("../helpers/validateBody")
const { schemas } = require("../models/users")
const ctrl = require("../controllers/auth")

const router = express.Router()

//sign up
router.post("/register", validateBody(schemas.registerSchema), ctrl.register)
// sign in
router.post("/login", validateBody(schemas.loginSchema), ctrl.login)

module.exports = router
