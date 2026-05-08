const DataResource = require("../models/DataResource.mongo");

const createDataResource = async (resourceData) => DataResource.create(resourceData);

const getDataResourceById = async (resourceId) =>
  DataResource.findById(resourceId).populate("owner", "username full_name");

const getAllDataResources = async (filters = {}) =>
  DataResource.find(filters)
    .populate("owner", "username full_name")
    .sort({ resource_name: 1 });

const updateDataResource = async (resourceId, updateData) =>
  DataResource.findByIdAndUpdate(resourceId, updateData, {
    new: true,
    runValidators: true,
  }).populate("owner", "username full_name");

const deleteDataResource = async (resourceId) => DataResource.findByIdAndDelete(resourceId);

module.exports = {
  createDataResource,
  getDataResourceById,
  getAllDataResources,
  updateDataResource,
  deleteDataResource,
};
