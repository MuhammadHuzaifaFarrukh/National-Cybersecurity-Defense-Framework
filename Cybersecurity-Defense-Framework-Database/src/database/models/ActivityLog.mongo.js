const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ActivityLogSchema = new Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    action_time: {
      type: Date,
      default: Date.now,
    },
    details: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ActivityLogSchema.index({ user_id: 1 });
ActivityLogSchema.index({ action_time: -1 });
ActivityLogSchema.index({ action: 1 });

module.exports = model("ActivityLog", ActivityLogSchema);
