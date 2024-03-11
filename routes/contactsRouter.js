import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact, 
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", addContact);

contactsRouter.put("/:id", updateContact);

contactsRouter.patch("/:id", updateStatusContact);

export default contactsRouter;
