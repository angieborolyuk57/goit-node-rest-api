const { User } = require("../models/users")
const { HttpError, CntrlWrapper } = require("../helpers")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

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

  const { SECRET_KEY } = process.env
  const payload = {
    id: User.id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" }) // 23 hour
  console.log(token)

  try {
    const { id } = jwt.verify(token, SECRET_KEY)
    console.log(id)
    const invalidToken = "kdfhdjgjsdfgjurhf"
    const result = jst.verify(invalidToken, SECRET_KEY) // error
    console.log(result)
  } catch (error) {
    console.log(error.message)
  }

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
