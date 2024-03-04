const contacts = require('../db/contacts.json');
const ctrlWrapper = require('../helpers/CntrlWrapper')

const { HttpError } = require("../../helpers");

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, '-createdAt -updatedAt', {
      skip,
      limit,
    }).populate('owner', 'email');
    res.status(200).json(result);
  };
  
  const getOneContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.findById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  };
  
  const createContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await contacts.create({ ...req.body, owner });
    res.status(201).json(result);
  };
  
  const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json({
      message: 'contact deleted',
    });
  };
  
  const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await contacts.findByIdAndUpdate(id, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  };
  
  const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
  
    if (favorite === undefined) {
      throw HttpError(400, 'missing field favorite');
    }
  
    const result = await contacts.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
  
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
  };
  
  module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
  };