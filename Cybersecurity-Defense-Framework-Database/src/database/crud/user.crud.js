const User = require("../models/User.mongo");

const createUser = async (userData) => User.create(userData);

const getUserById = async (userId) =>
  User.findById(userId).populate("role_id", "role_name description");

const getAllUsers = async (filters = {}) =>
  User.find(filters)
    .populate("role_id", "role_name description")
    .sort({ createdAt: -1 });

const updateUser = async (userId, updateData) =>
  User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).populate("role_id", "role_name description");

const deleteUser = async (userId) => User.findByIdAndDelete(userId);

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
