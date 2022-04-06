const Joi = require("joi");

/** This file is for validating the parameters passed in the req */
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const signupSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  loginSchema,
  signupSchema,
};
