const Joi = require("joi");
const httpStatus = require("http-status");
const { pick } = require("lodash");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body", "file"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    let errorMessage = "";
    if (error.details) {
      errorMessage = error.details.map((details) => details.message).join(", ");
    } else {
      errorMessage = error.message;
    }
    return next(httpStatus.BAD_REQUEST);
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
