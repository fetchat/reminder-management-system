const Joi = require("joi");
const { common } = require("./custom.validation.js");
const { messages } = require("../configs/messages.js");
const validation_errors = messages.validation_errors;

exports.register = {
  body: Joi.object()
    .keys({
      name: common.name.max(500).required(),
      email: common.email.required(),
      password: common.password.required(),
    })
    .messages({
      "object.base": validation_errors.body,
      "any.required": validation_errors.body,
    }),
};

exports.login = {
  body: Joi.object()
    .keys({
      email: common.email.required(),
      password: common.password.required(),
    })
    .messages({
      "object.base": validation_errors.body,
      "any.required": validation_errors.body,
    }),
};
