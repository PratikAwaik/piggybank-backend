const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [
      true,
      "It's difficult to identify a person without their name. Please provide it.",
    ],
    minlength: [3, "Your username must have atleast 3 characters"],
    unique: true,
    uniqueCaseInsensitive: true,
  },
  email: {
    type: String,
    required: [
      true,
      "Please provide your email. Don't worry, I won't steal anything like Facebook",
    ],
    unique: true,
    uniqueCaseInsensitive: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(uniqueValidator, {
  message:
    "Be a little creative. Provide a different {PATH} as this one is already taken.",
});

module.exports = mongoose.model("User", UserSchema);
