<<<<<<< HEAD
const { Schema, model } = require("mongoose")
const Joi = require("joi")

const { handleMongooseError } = require("../helpers")
=======
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)

const phoneRegexp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
<<<<<<< HEAD
      unique: true,
=======
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
<<<<<<< HEAD
      require: true,
    },
  },
  { versionKey: false, timestamps: true },
)

contactSchema.post("save", handleMongooseError)

=======
    },
  },
  { versionKey: false, timestamps: true },
);

>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)
contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
<<<<<<< HEAD
})
=======
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string().pattern(phoneRegexp),
  favorite: Joi.boolean(),
<<<<<<< HEAD
})
=======
});
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const schemas = {
  addSchema,
  updateFavoriteSchema,
  updateSchema,
<<<<<<< HEAD
}

const Contact = model("contact", contactSchema)
};
=======
};

const Contact = model("contact", contactSchema);
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)

module.exports = {
  Contact,
  schemas,
};
<<<<<<< HEAD

=======
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)
