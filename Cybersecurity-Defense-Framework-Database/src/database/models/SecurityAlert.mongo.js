const mongoose = require("mongoose");

const alertStatuses = require("../enums/alertStatus.enum");
const severities = require("../enums/severity.enum");

const { Schema, model } = mongoose;

const SecurityAlertSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    severity: {
      type: String,
      required: true,
      enum: severities,
    },
    status: {
      type: String,
      enum: alertStatuses,
      default: "open",
    },
    detected_at: {
      type: Date,
      default: Date.now,
    },
    network_event_id: {
      type: Schema.Types.ObjectId,
      ref: "NetworkEvent",
    },
    reported_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

SecurityAlertSchema.index({ severity: 1 });
SecurityAlertSchema.index({ status: 1 });
SecurityAlertSchema.index({ detected_at: -1 });
SecurityAlertSchema.index({ network_event_id: 1 });

module.exports = model("SecurityAlert", SecurityAlertSchema);
