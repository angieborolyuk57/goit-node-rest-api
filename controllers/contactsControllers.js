const contacts = require('../models/contacts');
const { HttpError}  = require('../helpers')



const getAllContacts = async (req, res, next) => {
    try {
      const result = await contacts.listContacts()
    res.status(200).json(result);
    } catch (error) {
      next(error)
    } 
  };
  
  const getOneContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await contacts.getContactById(id)
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
      const result = await contacts.addContact(req.body)
      res.status(201).json(result);

    } catch (error) {
      next(error)
    }
  };

  const updateContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await contacts.updateById(id, req.body)
    if(!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result)
    } catch (error) {
      next(error)
    }
  };

  const deleteContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await contacts.removeContact(id);
      if(!result) {
        throw HttpError(404, "Not found")
      }
      res.json({message: "Contact deleted"})
    
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
  
