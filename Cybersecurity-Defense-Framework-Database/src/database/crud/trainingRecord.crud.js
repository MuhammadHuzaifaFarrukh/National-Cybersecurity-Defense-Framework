const TrainingRecord = require("../models/TrainingRecord.mongo");

const createTrainingRecord = async (recordData) => TrainingRecord.create(recordData);

const getTrainingRecordById = async (recordId) =>
  TrainingRecord.findById(recordId)
    .populate("user_id", "username full_name")
    .populate("material_id");

const getAllTrainingRecords = async (filters = {}) =>
  TrainingRecord.find(filters)
    .populate("user_id", "username full_name")
    .populate("material_id")
    .sort({ updatedAt: -1 });

const updateTrainingRecord = async (recordId, updateData) =>
  TrainingRecord.findByIdAndUpdate(recordId, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("user_id", "username full_name")
    .populate("material_id");

const deleteTrainingRecord = async (recordId) =>
  TrainingRecord.findByIdAndDelete(recordId);

module.exports = {
  createTrainingRecord,
  getTrainingRecordById,
  getAllTrainingRecords,
  updateTrainingRecord,
  deleteTrainingRecord,
};
