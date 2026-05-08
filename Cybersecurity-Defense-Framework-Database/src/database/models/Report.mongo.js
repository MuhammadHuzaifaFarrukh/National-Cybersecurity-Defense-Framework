const mongoose = require("mongoose");

const reportTypes = require("../enums/reportType.enum");

const { Schema, model } = mongoose;

const isValidUrl = (value) => {
  if (!value) {
    return true;
  }

  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
};

const ReportSchema = new Schema(
  {
    report_type: {
      type: String,
      required: true,
      enum: reportTypes,
    },
    generated_at: {
      type: Date,
      default: Date.now,
    },
    format: {
      type: String,
      enum: ["pdf"],
      default: "pdf",
    },
    file_name: {
      type: String,
      required: true,
      trim: true,
    },
    file_path: {
      type: String,
      required: true,
      trim: true,
    },
    file_url: {
      type: String,
      trim: true,
      validate: {
        validator: isValidUrl,
        message: "file_url must be a valid URL.",
      },
    },
    generated_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    related_incident_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Incident",
      },
    ],
    related_alert_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "SecurityAlert",
      },
    ],
    related_event_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "NetworkEvent",
      },
    ],
  },
  {
    timestamps: true,
  }
);

ReportSchema.index({ report_type: 1 });
ReportSchema.index({ generated_by: 1 });
ReportSchema.index({ generated_at: -1 });

module.exports = model("Report", ReportSchema);
