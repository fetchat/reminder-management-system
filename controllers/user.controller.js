const helpers = require("../utils/helpers.js");
const bcrypt = require("bcrypt");
const { messages } = require("../configs/messages.js");
const Users = require("../models/users.js");
const { handleLogError } = require("../configs/errorLogger.js");
const { getToken } = require("../configs/auth.js");

/**
 * user signup
 * @param {Request} request
 * @param {Response} reply
 */
exports.signup = async (request, reply) => {
  const { name, email, password } = request.body;

  try {
    let user = await Users.findOne({ email });

    if (user) {
      return helpers.sendErrorResponse(
        messages.common_reply_messages.errors
          .email_already_associated_with_another_account,
        reply
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new Users({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    return helpers.sendSuccessResponse(
      messages.common_reply_messages.success.user.added,
      {},
      reply
    );
  } catch (error) {
    handleLogError(error, "UserController -> signup");
    return helpers.sendErrorResponse(
      messages.common_reply_messages.error_unknown,
      reply
    );
  }
};

/**
 * Login
 * @param {Request} request
 * @param {Response} reply
 */
exports.login = async (request, reply) => {
  const { email, password } = request.body;
  try {
    const query = {
      email,
      is_delete: false,
      password: { $exists: true },
    };
    // Find user by email
    const user = await Users.findOne(query);

    if (!user) {
      return helpers.sendErrorResponse(
        messages.common_reply_messages.errors.user_not_exist,
        reply
      );
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return helpers.sendErrorResponse(
        messages.common_reply_messages.errors.incorrect_password,
        reply
      );
    }

    // Create JWT token
    const token = await getToken({ id: user._id });

    return helpers.sendSuccessResponse(
      messages.common_reply_messages.success.default,
      { token, user },
      reply
    );
  } catch (error) {
    handleLogError(error, "UserController -> login");
    return helpers.sendErrorResponse(
      messages.common_reply_messages.error_unknown,
      reply
    );
  }
};
