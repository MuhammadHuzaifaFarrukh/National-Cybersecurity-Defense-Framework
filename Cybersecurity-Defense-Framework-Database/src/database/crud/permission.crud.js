const Permission = require("../models/Permission.mongo");

const createPermission = async (permissionData) => Permission.create(permissionData);

const getPermissionById = async (permissionId) => Permission.findById(permissionId);

const getAllPermissions = async (filters = {}) =>
  Permission.find(filters).sort({ permission_name: 1 });

const updatePermission = async (permissionId, updateData) =>
  Permission.findByIdAndUpdate(permissionId, updateData, {
    new: true,
    runValidators: true,
  });

const deletePermission = async (permissionId) => Permission.findByIdAndDelete(permissionId);

module.exports = {
  createPermission,
  getPermissionById,
  getAllPermissions,
  updatePermission,
  deletePermission,
};
