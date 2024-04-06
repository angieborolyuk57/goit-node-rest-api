const { Contact } = require("../models/contacts")
const { HttpError } = require("../helpers")

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user
    const filter = { owner }

    const result = await Contact.find(filter, "-createdAt -updatedAt").populate(
      "owner",
      "email",
    )
    const total = await Contact.countDocuments(filter)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const { _id: owner } = req.user
    const filter = { owner }

    const result = await Contact.findOne({ ...filter, _id: id })
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

    const result = await Contact.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    })

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
    const { id, _id: owner } = req.params
    const updateData = { ...req.body, owner }

    const result = await Contact.findByIdAndUpdate(
      { _id: id, owner },
      updateData,
      {
        new: true,
      },
    )
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
    const { _id: owner } = req.user

    const filter = { owner, _id: id }

    const result = await Contact.findOneAndDelete(filter)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(204).json({ message: "Contact deleted" })
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
