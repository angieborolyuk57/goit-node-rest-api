const express = require("express");
const {
    getAllContacts,
    getOneContact,
    addContact,
    deleteContact,
    updateContact,
  } = require('../controllers/contactsControllers');
  
const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.post("/", addContact)

contactsRouter.put("/:id", updateContact);

contactsRouter.delete("/:id", deleteContact);

module.exports = contactsRouter;
  