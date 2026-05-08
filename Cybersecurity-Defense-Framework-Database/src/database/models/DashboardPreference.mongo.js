const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const DashboardPreferenceSchema = new Schema(
  {
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
    layout: {
      type: String,
      enum: ["default", "compact", "expanded"],
      default: "default",
    },
    notification_mode: {
      type: String,
      enum: ["email", "in_app", "sms", "none"],
      default: "in_app",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

DashboardPreferenceSchema.index({ theme: 1 });

module.exports = model("DashboardPreference", DashboardPreferenceSchema);
