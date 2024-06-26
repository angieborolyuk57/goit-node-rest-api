const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const contactsRouter = require("./routes/contactsRouter.js")
const authRouter = require("./routes/auth.js")

const app = express()

app.use(morgan("tiny"))
app.use(cors())
app.use(express.json())

app.use("/users", authRouter)
app.use("/api/contacts", contactsRouter)

app.use(express.static("public"))

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err
  res.status(status).json({ message })
})

module.exports = app
