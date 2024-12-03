const Joi = require("joi");
const { common } = require("./custom.validation.js");
const { messages } = require("../configs/messages.js");
const validation_errors = messages.validation_errors;

exports.add = {
  body: Joi.object()
    .keys({
      // user_id: common.object_id.required(),
      title: common.title.required(),
      message: common.message.required(),
      dateTime: common.dateTime.required(),
      recurrence: common.recurrence.valid("daily", "weekly", "monthly"),
    })
    .messages({
      "object.base": validation_errors.body,
      "any.required": validation_errors.body,
    }),
};

exports.update = {
  body: Joi.object()
    .keys({
      title: common.title,
      message: common.message,
      dateTime: common.dateTime,
    })
    .messages({
      "object.base": validation_errors.body,
      "any.required": validation_errors.body,
    }),
};
