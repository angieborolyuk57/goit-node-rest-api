const express = require("express")

const validateBody = require("../helpers/validateBody")
const { authenticate } = require("../middlewares")
const { schemas } = require("../models/users")
const ctrl = require("../controllers/auth")

const router = express.Router()

//sign up
router.post("/register", validateBody(schemas.registerSchema), ctrl.register)
// sign in
router.post("/login", validateBody(schemas.loginSchema), ctrl.login)

router.get("/current", authenticate, ctrl.getCurrent)

router.post("/logout", authenticate, ctrl.logout)

module.exports = router
