const mongoose = require("mongoose");

const trainingStatuses = require("../enums/trainingStatus.enum");

const { Schema, model } = mongoose;

const TrainingRecordSchema = new Schema(
  {
    completion_status: {
      type: String,
      enum: trainingStatuses,
      default: "not_started",
    },
    completion_date: {
      type: Date,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    material_id: {
      type: Schema.Types.ObjectId,
      ref: "TrainingMaterial",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TrainingRecordSchema.index({ user_id: 1 });
TrainingRecordSchema.index({ material_id: 1 });
TrainingRecordSchema.index({ completion_status: 1 });
TrainingRecordSchema.index({ user_id: 1, material_id: 1 }, { unique: true });

module.exports = model("TrainingRecord", TrainingRecordSchema);
