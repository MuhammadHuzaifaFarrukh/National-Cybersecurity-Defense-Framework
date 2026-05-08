const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
};

const TrainingMaterialSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "cybersecurity_awareness",
        "phishing_prevention",
        "incident_response",
        "network_security",
        "data_protection",
        "compliance",
      ],
    },
    content_type: {
      type: String,
      enum: ["pdf", "video", "article", "quiz", "presentation"],
      required: true,
    },
    content_url: {
      type: String,
      required: true,
      validate: {
        validator: isValidUrl,
        message: "content_url must be a valid URL.",
      },
    },
  },
  {
    timestamps: true,
  }
);

TrainingMaterialSchema.index({ category: 1 });
TrainingMaterialSchema.index({ content_type: 1 });

module.exports = model("TrainingMaterial", TrainingMaterialSchema);
