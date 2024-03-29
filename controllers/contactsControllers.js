const { Contact } = require("../models/contacts")
const { HttpError } = require("../helpers")

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip: 2, limit: 2
    }).populate("owner", "email")
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Contact.findById(id)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user
    const result = await Contact.create({ ...req.body, owner })
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Contact.findByIdAndDelete(id)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({ message: "Contact deleted" })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllContacts,
  getOneContact,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
}
