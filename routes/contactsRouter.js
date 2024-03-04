import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  addContact,
  updateContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContact);

contactsRouter.put("/:id", updateStatusContact);

export default contactsRouter;
