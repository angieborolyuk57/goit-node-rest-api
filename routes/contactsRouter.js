const express = require("express")
const {
  getAllContacts,
  getOneContact,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
} = require("../controllers/contactsControllers")

const validateBody = require("../helpers/validateBody")
const { isValidId, authenticate } = require("../middlewares")
const { schemas } = require("../models/contacts")

const contactsRouter = express.Router()

contactsRouter.get("/", authenticate, getAllContacts)

contactsRouter.get("/:id", authenticate, isValidId, getOneContact)

contactsRouter.post(
  "/",
  authenticate, validateBody(schemas.updateSchema),
  addContact,
)

contactsRouter.put(
  "/:id",
  isValidId,
  authenticate, 
  validateBody(schemas.updateSchema),
  updateContact,
)

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  authenticate, 
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite,
)

contactsRouter.delete("/:id", authenticate, isValidId, deleteContact)

module.exports = contactsRouter
