const mongoose = require("mongoose");

const incidentStatuses = require("../enums/incidentStatus.enum");
const severities = require("../enums/severity.enum");

const { Schema, model } = mongoose;

const IncidentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    severity: {
      type: String,
      required: true,
      enum: severities,
    },
    status: {
      type: String,
      enum: incidentStatuses,
      default: "reported",
    },
    reported_at: {
      type: Date,
      default: Date.now,
    },
    alert_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "SecurityAlert",
      },
    ],
    reported_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

IncidentSchema.index({ severity: 1 });
IncidentSchema.index({ status: 1 });
IncidentSchema.index({ reported_at: -1 });
IncidentSchema.index({ reported_by: 1 });

module.exports = model("Incident", IncidentSchema);
