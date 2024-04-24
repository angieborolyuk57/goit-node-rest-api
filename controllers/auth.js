const { User } = require("../models/users")
const { HttpError, CntrlWrapper } = require("../helpers")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const gravatar = require("gravatar")
const fs = require("fs/promises")
const Jimp = require("jimp")
const path = require("path")
const { nanoid } = require("nanoid")
const sendEmail = require("../helpers/sendEmail")
const { BASE_URL } = process.env

const avatarDir = path.join(__dirname, "../", "public", "avatars")

const register = async (req, res) => {
  const { email, password } = req.body
  const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "404" })
  const user = await User.findOne({ email })

  if (user) {
    throw HttpError(409, "Email in use")
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const verificationCode = nanoid()

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  })
  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}api/auth/verify/${verificationCode}">Click here to verify your email</a>`,
  }

  await sendEmail(verifyEmail)

  res.status(201).json({
    user: {
      email: newUser.email,
      subsription: newUser.subscription,
      avatarUrl: avatarURL,
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

const updateAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" })
  }

  const { _id } = req.user
  const { path: tempUpload, originalname } = req.file

  const img = await Jimp.read(tempUpload)
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempUpload)
  const filename = `${Date.now()}-${originalname}`
  const resultUpload = path.join(avatarDir, filename)
  await fs.rename(tempUpload, resultUpload)
  const avatarURL = path.join("avatars", filename)

  await User.findByIdAndUpdate(_id, { avatarURL })
  res.status(200).json({ avatarURL })
}

module.exports = {
  register: CntrlWrapper(register),
  login: CntrlWrapper(login),
  getCurrent: CntrlWrapper(getCurrent),
  logout: CntrlWrapper(logout),
  updateAvatar: CntrlWrapper(updateAvatar),
}
