const mongoose = require("mongoose");

const eventTypes = require("../enums/eventType.enum");

const { Schema, model } = mongoose;

const ipv4Pattern =
  /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

const NetworkEventSchema = new Schema(
  {
    event_type: {
      type: String,
      required: true,
      enum: eventTypes,
    },
    source_ip: {
      type: String,
      required: true,
      validate: {
        validator: (value) => ipv4Pattern.test(value),
        message: "source_ip must be a valid IPv4 address.",
      },
    },
    destination_ip: {
      type: String,
      required: true,
      validate: {
        validator: (value) => ipv4Pattern.test(value),
        message: "destination_ip must be a valid IPv4 address.",
      },
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "ignored", "escalated"],
      default: "new",
    },
    generated_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

NetworkEventSchema.index({ event_type: 1 });
NetworkEventSchema.index({ source_ip: 1 });
NetworkEventSchema.index({ destination_ip: 1 });
NetworkEventSchema.index({ timestamp: -1 });
NetworkEventSchema.index({ status: 1 });

module.exports = model("NetworkEvent", NetworkEventSchema);
