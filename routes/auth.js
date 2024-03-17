<<<<<<< HEAD
const express = require("express")

const validateBody = require("../helpers/validateBody")
const { authenticate } = require("../middlewares")
const { schemas } = require("../models/users")
const ctrl = require("../controllers/auth")

const router = express.Router()

//sign up
router.post("/register", validateBody(schemas.registerSchema), ctrl.register)
// sign in
router.post(
  "/login",
  authenticate,
  validateBody(schemas.loginSchema),
  ctrl.login,
)

router.get("current", authenticate, ctrl.getCurrent)

router.get("/logout", authenticate, ctrl.logout)

module.exports = router
  ctrl.register);
=======
const express = require("express");

const validateBody = require("../helpers/validateBody");
const { schemas } = require("../models/users");
const ctrl = require("../controllers/auth");

const router = express.Router();

//sign up
router.post("/register",  ctrl.register);

module.exports = router;
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)
