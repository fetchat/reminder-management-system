const helpers = require("../utils/helpers.js");
const { messages } = require("../configs/messages.js");
const Reminder = require("../models/reminders.js");
const { handleLogError } = require("../configs/errorLogger.js");

/**
 * add reminder
 * @param {Request} request
 * @param {Response} reply
 */
exports.addReminder = async (request, reply) => {
  try {
    console.log({request})
    const reminder_id = await helpers.getNanoId();
    const user_id = request.user.id;
    request.body = { ...request.body, reminder_id, user_id };

    const reminder = await Reminder.create(request.body);

    return helpers.sendSuccessResponse(
      messages.common_reply_messages.success.reminder.added,
      { reminder },
      reply
    );
  } catch (error) {
    handleLogError(error, "ReminderController -> addReminder");
    return helpers.sendErrorResponse(
      messages.common_reply_messages.error_unknown,
      reply
    );
  }
};

/**
 * list reminders
 * @param {Request} request
 * @param {Response} reply
 */
exports.listReminders = async (request, reply) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    let searchCondition = { user_id: request.user.id };

    if (request.query.search) {
      searchCondition.reminder_id = {
        $regex: request.query.search,
        $options: "i",
      };
    }

    if (request.query.status) {
      searchCondition.status = { $regex: request.query.status, $options: "i" };
    }

    const reminder = await Reminder.find(searchCondition)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!reminder) {
      return helpers.sendSuccessResponse(
        messages.common_reply_messages.success.default,
        { reminder: [], totalCount: 0, totalPages: 0, pageNo: page },
        reply
      );
    }

    const totalCount = await Reminder.countDocuments(searchCondition);
    const totalPages = Math.ceil(totalCount / limit);

    return helpers.sendSuccessResponse(
      messages.common_reply_messages.success.default,
      { reminder, totalCount, totalPages, pageNo: page },
      reply
    );
  } catch (error) {
    handleLogError(error, "ReminderController -> listReminders");
    return helpers.sendErrorResponse(
      messages.common_reply_messages.error_unknown,
      reply
    );
  }
};

/**
 * edit reminder by id
 * @param {Request} request
 * @param {Response} reply
 */
exports.editReminder = async (request, reply) => {
  try {
    let reminder = await Reminder.findOne({ _id: request.params.id, user_id : request.user.id });

    if (!reminder) {
      return helpers.sendErrorResponse(
        messages.common_reply_messages.errors.not_exist,
        reply
      );
    }

    if (request.body.title) reminder.title = request.body.title;
    if (request.body.message) reminder.message = request.body.message;
    if (request.body.dateTime) reminder.dateTime = request.body.dateTime;

    await reminder.save();

    return helpers.sendSuccessResponse(
      messages.common_reply_messages.success.reminder.updated,
      {},
      reply
    );
  } catch (error) {
    handleLogError(error, "ReminderController -> editReminder");
    return helpers.sendErrorResponse(
      messages.common_reply_messages.error_unknown,
      reply
    );
  }
};

/**
 * delete reminder by id
 * @param {Request} request
 * @param {Response} reply
 */
exports.deleteReminder = async (request, reply) => {
    try{
        const reminder = await Reminder.findOneAndDelete({ 
            _id: request.params.id,
            user_id : request.user.id
          });
      
          if (!reminder) {
            return helpers.sendErrorResponse(
                messages.common_reply_messages.errors.not_exist,
                reply
              );
          }
          return helpers.sendSuccessResponse(
            messages.common_reply_messages.success.reminder.deleted,
            {},
            reply
          );
    }catch (error) {
        handleLogError(error, "ReminderController -> deleteReminder");
        return helpers.sendErrorResponse(
          messages.common_reply_messages.error_unknown,
          reply
        );
      }
};