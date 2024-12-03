const  mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      is_delete: {
        type: Boolean,
        default: false,
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
  
module.exports =  mongoose.model("Users", UserSchema);