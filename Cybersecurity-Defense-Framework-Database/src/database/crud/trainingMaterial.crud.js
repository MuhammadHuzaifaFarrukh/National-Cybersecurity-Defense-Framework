const TrainingMaterial = require("../models/TrainingMaterial.mongo");

const createTrainingMaterial = async (materialData) =>
  TrainingMaterial.create(materialData);

const getTrainingMaterialById = async (materialId) =>
  TrainingMaterial.findById(materialId);

const getAllTrainingMaterials = async (filters = {}) =>
  TrainingMaterial.find(filters).sort({ title: 1 });

const updateTrainingMaterial = async (materialId, updateData) =>
  TrainingMaterial.findByIdAndUpdate(materialId, updateData, {
    new: true,
    runValidators: true,
  });

const deleteTrainingMaterial = async (materialId) =>
  TrainingMaterial.findByIdAndDelete(materialId);

module.exports = {
  createTrainingMaterial,
  getTrainingMaterialById,
  getAllTrainingMaterials,
  updateTrainingMaterial,
  deleteTrainingMaterial,
};
