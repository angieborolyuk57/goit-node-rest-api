const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError} = require('../helpers')

const phoneRegexp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/

const contactsSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    }, 
    email:{ 
        type: String, 
    }, 
    phone:{ 
        type: String, 
        match: phoneRegexp,
        required: true, 
    }, 
    favorite:{
        type: Boolean, 
        default: false,
    }
}, {versionKey: false, timestamps: true});

bookSchema.post("save", handleMongooseError)

const addSchema = Joi.object({
    name: Joi.string().required(), 
    email: Joi.string().required(), 
    phone: Joi.string().pattern(phoneRegexp).required(), 
    favorite: Joi.boolean(), 
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(), 
})

const schemas = {
    addSchema, 
    updateFavoriteSchema,
}

const Contact = model('contact', contactsSchema);

module.exports = {
    Contact, 
    schemas,
}