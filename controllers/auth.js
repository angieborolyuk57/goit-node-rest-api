<<<<<<< HEAD
const { User } = require("../models/users")
const { HttpError, CntrlWrapper } = require("../helpers")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw HttpError(409, "Email in use")
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({ ...req.body, password: hashPassword })
  res.status(201).json({
    user: {
      email: newUser.email,
      subsription: newUser.subscription,
    },
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw HttpError(401, "Email or password is wrong")
  }
  const passwordCompare = await bcrypt.compare(password, user.password)

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong")
  }

  const { SECRET_KEY } = process.env

  const payload = { id: user._id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
  await User.findByIdAndUpdate(user._id, { token })

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subsription: user.subscription,
    },
  })
}

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user
  res.status(200).json({
    email,
    subscription,
  })
}

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: " " })
  res.status(204).json({
    message: "No content",
  })
}

module.exports = {
  register: CntrlWrapper(register),
  login: CntrlWrapper(login),
  getCurrent: CntrlWrapper(getCurrent),
  logout: CntrlWrapper(logout),
}
=======
const { User } = require("../models/users");
const { HttpError, CntrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if( user) {
    throw new HttpError(409, "Email in use");
  }
  const newUser = await User.create(req.body);
  res.json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = {
  register: CntrlWrapper(register),
};
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)
