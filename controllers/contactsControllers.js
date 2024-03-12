const contacts = require('../db/contacts.json');
const HttpError = require('../helpers/index.js')
const { nanoid } = require("nanoid");
const fs = require("fs/promises")
const Joi = require('joi');


const addSchema = Joi.object({
  name: Joi.string().required(), 
  email: Joi.string().email().required(), 
  phone: Joi.string().required()
})

const getAllContacts = async (req, res, next) => {
    try {
    res.status(200).json(contacts);
    } catch (error) {
      next(error)
    } 
  };
  
  const getOneContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = contacts.find(contact => contact.id === id);
      if (!result) {
        throw HttpError(404, "Not found")
      }  
      res.status(200).json(result);

    } catch (error) {
      next(error)
    }
  };
 

   const addContact = async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
      const newContact = {
        id: nanoid(),
        name, 
        email, 
        phone
    };
    contacts.push(newContact);
      res.status(201).json(newContact);
      await fs.writeFile(contacts);
      console.log(req.body);
    } catch (error) {
      next(error)
    }
  };

  const updateContact = async (req, res, next) => {
    try {
      const { error} = addSchema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message)
      }
      const { id } = req.params;
      const index = contacts.findIndex(contact => contact.id === id);
      if (index === -1) {
        throw HttpError(404, "Contact not found");
      }
      const updatedContact = { ...contacts[index], ...req.body };
      contacts[index] = updatedContact;
      res.status(200).json(updatedContact);
    
    } catch (error) {
      next(error)
    }
  };

  
  const deleteContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const index = await contacts.findIndex(contact => contact.id === id)
    if(index === -1 ) {
        throw HttpError(404, "Not found")
    }
    res.json({
      message: 'contact deleted',
    });
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result; 
    
    } catch (error) {
      next(error)
    }
    
    
  };
  
 
  
  
  module.exports = {
    getAllContacts,
    getOneContact,
    addContact,
    deleteContact,
    updateContact,
  };
  
