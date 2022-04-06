var mongoose = require("mongoose");
var router = require("express").Router();
const bcrypt = require("bcryptjs");
const { pick } = require("lodash");

var UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

/** tranform method picks up the desired values and return the response */
UserSchema.methods.transform = function () {
  const user = this;
  return pick(user.toJSON(), ["_id", "firstname", "lastname", "email"]);
};

/** This method will be called before saving a new document.
 * so whenever I am saving a new record, encrypting the password field and save it to db
 */
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
