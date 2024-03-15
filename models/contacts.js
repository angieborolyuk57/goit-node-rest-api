const { Schema, model } = require('mongoose');


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
        match: /^[1-9]\d{2}-\d{3}-\d{4}$/,
        required: true, 
    }, 
    favorite:{
        type: Boolean, 
        default: false,
    }
})

const Contact = model('contact', contactsSchema);

module.exports = Contact;