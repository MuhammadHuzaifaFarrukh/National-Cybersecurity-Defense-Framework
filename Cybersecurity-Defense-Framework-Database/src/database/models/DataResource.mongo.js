const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const DataResourceSchema = new Schema(
  {
    resource_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    classification: {
      type: String,
      enum: ["public", "internal", "confidential", "restricted", "top_secret"],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

DataResourceSchema.index({ classification: 1 });
DataResourceSchema.index({ owner: 1 });

module.exports = model("DataResource", DataResourceSchema);
