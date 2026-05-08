const Role = require("../models/Role.mongo");

const createRole = async (roleData) => Role.create(roleData);

const getRoleById = async (roleId) => Role.findById(roleId).populate("permission_ids");

const getAllRoles = async (filters = {}) =>
  Role.find(filters).populate("permission_ids").sort({ role_name: 1 });

const updateRole = async (roleId, updateData) =>
  Role.findByIdAndUpdate(roleId, updateData, {
    new: true,
    runValidators: true,
  });

const deleteRole = async (roleId) => Role.findByIdAndDelete(roleId);

module.exports = {
  createRole,
  getRoleById,
  getAllRoles,
  updateRole,
  deleteRole,
};
