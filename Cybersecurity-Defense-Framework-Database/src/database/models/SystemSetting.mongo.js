const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const SystemSettingSchema = new Schema(
  {
    setting_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    setting_value: {
      type: Schema.Types.Mixed,
      required: true,
    },
    managed_for_role_id: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

SystemSettingSchema.index({ managed_for_role_id: 1 });

module.exports = model("SystemSetting", SystemSettingSchema);
