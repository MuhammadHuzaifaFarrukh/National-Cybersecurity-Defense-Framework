const trainingMaterialCrud = require("../database/crud/trainingMaterial.crud");
const trainingRecordCrud = require("../database/crud/trainingRecord.crud");
const trainingAggregations = require("../database/aggregations/training.aggregations");

const assignTrainingToUser = async (trainingRecordData) =>
  trainingRecordCrud.createTrainingRecord(trainingRecordData);

module.exports = {
  assignTrainingToUser,
  createTrainingMaterial: trainingMaterialCrud.createTrainingMaterial,
  getTrainingMaterialById: trainingMaterialCrud.getTrainingMaterialById,
  getAllTrainingMaterials: trainingMaterialCrud.getAllTrainingMaterials,
  updateTrainingMaterial: trainingMaterialCrud.updateTrainingMaterial,
  deleteTrainingMaterial: trainingMaterialCrud.deleteTrainingMaterial,
  getTrainingRecordById: trainingRecordCrud.getTrainingRecordById,
  getAllTrainingRecords: trainingRecordCrud.getAllTrainingRecords,
  updateTrainingRecord: trainingRecordCrud.updateTrainingRecord,
  deleteTrainingRecord: trainingRecordCrud.deleteTrainingRecord,
  getTrainingCompletionStats: trainingAggregations.getTrainingCompletionStats,
  getTrainingScoresByCategory: trainingAggregations.getTrainingScoresByCategory,
};
