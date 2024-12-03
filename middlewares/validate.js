const Joi = require('joi');
const { filterObjectByKeys } = require('../utils/helpers.js')


/**
 * send valdiation errors in response
 * @param {object} error
 * @param {Response} reply
 */
exports.sendValidationsErrorResponse = (errors, reply) => {
    const data = {};
    errors.forEach((error) => {
      data[error.context.label || error.context.key] = error.message;
    });
  
    const response = {
      status: false,
      message: "Validation Errors",
      errors: data,
    };
    return reply.status(400).json(response);
  };
/**
 * Validate inputs of request
 * @param {Object} schema
 * @param {Object} inputs
 * @param {Response} reply
 * @returns Object
 */
exports.validateInputs = (schema) => (request, reply, next) => {
    const validSchema = filterObjectByKeys(schema, ["params", "query", "body"]);
    const object = filterObjectByKeys(request, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" }, abortEarly: false })
      .validate(object);
  
    if (error) {
      console.error('Validation Error:', error.details);
      return this.sendValidationsErrorResponse(error.details, reply);
    }
    Object.assign(request, value);
    return next();
  };