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
    email: newUser.email,
    name: newUser.name,
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
      name: user.name,
      subsription: user.subsription,
    },
  })
}

const getCurrent = async (req, res) => {
  const { email, subsription } = req.user
  res.status(200).json({
    email,
    subsription,
  })
}

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: " " })
  res.json({
    message: "Logout success",
  })
}

module.exports = {
  register: CntrlWrapper(register),
  login: CntrlWrapper(login),
  getCurrent: CntrlWrapper(getCurrent),
  logout: CntrlWrapper(logout),
}
