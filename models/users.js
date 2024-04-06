const { Schema, model } = require("mongoose")
const Joi = require("joi")

const { handleMongooseError } = require("../helpers")

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      validate: {
        validator: function (value) {
<<<<<<< HEAD
          return value.length >= 6
=======
          return value.length >= 6;
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)
        },
        message: "Password must be at least 6 characters long",
      },
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
<<<<<<< HEAD
)

userSchema.post("save", handleMongooseError)
=======
);

userSchema.post("save", handleMongooseError);
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)

const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})
<<<<<<< HEAD
})
=======
});
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})
<<<<<<< HEAD
})
=======
});
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)

const schemas = {
  registerSchema,
  loginSchema,
<<<<<<< HEAD
}

const User = model("user", userSchema)
=======
};

const User = model("user", userSchema);
>>>>>>> 3ac0428 (added controllers, schema and model for auth, error handling)

module.exports = {
  schemas,
  User,
}
