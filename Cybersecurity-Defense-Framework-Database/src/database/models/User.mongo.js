const mongoose = require("mongoose");

const userStatus = require("../enums/userStatus.enum");

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
    },
    password_hash: {
      type: String,
      required: true,
      select: false,
    },
    full_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    status: {
      type: String,
      enum: userStatus,
      default: "active",
    },
    role_id: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ role_id: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ createdAt: -1 });

module.exports = model("User", UserSchema);
