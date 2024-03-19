const { User } = require("../models/users")
const { HttpError, CntrlWrapper } = require("../helpers")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new HttpError(409, "Email in use")
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({ ...req.body, password: hashPassword })
  res.json({
    email: newUser.email,
    name: newUser.name,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new HttpError(401, "Email or password is wrong")
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw new HttpError(401, "Email or password is wrong")
  }

  const token = user.createToken()

  res.json({
    token,
    user: {
      email: user.email,
      name: user.name,
    },
  })
}

module.exports = {
  register: CntrlWrapper(register),
  login: CntrlWrapper(login),
}
