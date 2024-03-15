const express = require("express");
const {
  getAllContacts,
  getOneContact,
  addContact, 
  deleteContact, 
  updateContact,
  updateFavorite, 
} = require("../controllers/contactsControllers");

const validateBody = require("../helpers/validateBody")
const isValidId = require("../middlewares/isValidId");
const { schemas } = require("../models/contacts");
  
const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id",isValidId,  getOneContact);

contactsRouter.post("/", validateBody(schemas.addSchema), addContact)

contactsRouter.put("/:id",isValidId, validateBody(schemas.addSchema), updateContact);

contactsRouter.patch("/:id/favorite",isValidId, validateBody(schemas.updateFavoriteSchema), updateFavorite);

contactsRouter.delete("/:id",isValidId,  deleteContact);

module.exports = contactsRouter;
  