const express = require("express");
const {
  getAllContacts,
  getOneContact,
  addContact, 
  deleteContact, 
  updateContact, 
} = require("../controllers/contactsControllers");

const { createContactSchema,updateContactSchema  } = require("../schemas/contactsSchemas");
const validateBody = require("../helpers/validateBody")
  
const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.post("/", validateBody(createContactSchema), addContact)

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.delete("/:id", deleteContact);

module.exports = contactsRouter;
  