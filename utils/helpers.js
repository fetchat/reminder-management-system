const {messages} = require("../configs/messages.js");
const _ = require("lodash");

/**
 * Send success response with custom message and status code
 * @param {String} message
 * @param {Object} data
 * @param {Response} reply
 */
exports.sendSuccessResponse = (message, data, reply) => {
    var response = {
        status: true,
        message: message,
        result: data || [],
    };
    reply.status(messages.status_code.success).send(response);
};

/**
 * Send input validations error response
 * @param {Object} errors
 * @param {Response} reply
 */
exports.sendValidationsErrorResponse = (errors, reply) => {
    var data = {};
    errors.map((error) => {
        data[error.context.label || error.context.key] = error.message;
    });

    const response = {
        status: false,
        message: "Validation Errors",
        errors: data,
    };
    return reply.status(400).send(response);
};

/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
exports.filterObjectByKeys = (object, keys) => {
    return keys.reduce((obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  };

/**
 * Send error response
 * @param {String} message
 * @param {Response} reply
 * @param {Number} statusCode
 */
exports.sendErrorResponse = (msg, reply, statusCode = undefined) => {
    var err = {
        status: false,
        message: msg,
    };
    reply.status(statusCode ? statusCode : 400).send(err);
};


exports.getNanoId = async(prefix = "RMN", id_length = 4) => {
    const { customAlphabet } = await import('nanoid');
    const alphabets = "abcdefghjkmnpqrstuvwxyz98765432";
    const nanoid = customAlphabet(alphabets, id_length);
    let ref_id = prefix + new Date().getMonth() + nanoid();
    return ref_id.toUpperCase();
};