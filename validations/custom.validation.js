const Joi = require('joi');
const {messages} = require('../configs/messages.js');

const validation_errors = messages.validation_errors;

exports.common = {
    object_id: Joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
    name: Joi.string()
        .max(500)
        .messages({
            "string.base": `Name ${validation_errors.string_base}`,
            "string.empty": `Name ${validation_errors.field_empty}`,
            "string.max": `Name ${validation_errors.string_max} 500`,
            "any.required": `Name ${validation_errors.field_required}`,
        }),
    email: Joi.string()
        .max(500)
        .messages({
            "string.base": `Email ${validation_errors.string_base}`,
            "string.empty": `Email ${validation_errors.field_empty}`,
            "string.max": `Email ${validation_errors.string_max} 500`,
            "any.required": `Email ${validation_errors.field_required}`,
        }),
    password: Joi.string()
        .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        .messages({
            "string.base": `Password ${validation_errors.string_base}`,
            "string.empty": `Password ${validation_errors.field_empty}`,
            "string.min": `Password ${validation_errors.string_min} 8`,
            "string.pattern.base": `${validation_errors.strong_password}`,
            "any.required": `Password ${validation_errors.field_required}`,
        }),
    title: Joi.string()
        .max(200)
        .messages({
            "string.base": `Title  ${validation_errors.string_base}`,
            "string.empty": `Title  ${validation_errors.field_empty}`,
            "string.max": `Title  ${validation_errors.string_max} 200`,
            "any.required": `Title  ${validation_errors.field_required}`,
        }),
    message: Joi.string().messages({
            "string.base": `Message ${validation_errors.string_base}`,
            "string.empty": `Message ${validation_errors.field_empty}`,
            "string.max": `Message ${validation_errors.string_max} 500`,
            "any.required": `Message${validation_errors.field_required}`,
        }),
    dateTime: Joi.date().messages({
            "date.base": `Date ${validation_errors.date_base}`,
            "date.empty": `Date ${validation_errors.field_empty}`,
            "any.required": `Date${validation_errors.field_required}`,
        }),
    recurrence: Joi.string().messages({
        "string.base": `Recurrence ${validation_errors.string_base}`,
        "string.empty": `Recurrence ${validation_errors.field_empty}`,
        "any.required": `Recurrence${validation_errors.field_required}`,
    }),
}