const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reminderSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    reminder_id: { 
        type: String,  
    },
    title: { 
        type: String, 
    },
    message: { 
        type: String, 
    },
    dateTime: { 
        type: Date, 
        required: true 
    },
    recurrence: { 
        type: String,
        enum: ['daily','weekly','monthly'], 
        default: null 
    },
    status: {
      type: String,
      enum: ['pending','triggered'],
      default: "pending",
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Reminders", reminderSchema);
