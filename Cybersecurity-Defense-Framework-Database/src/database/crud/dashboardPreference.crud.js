const DashboardPreference = require("../models/DashboardPreference.mongo");

const createDashboardPreference = async (preferenceData) =>
  DashboardPreference.create(preferenceData);

const getDashboardPreferenceById = async (preferenceId) =>
  DashboardPreference.findById(preferenceId).populate(
    "user_id",
    "username full_name status"
  );

const getDashboardPreferenceByUser = async (userId) =>
  DashboardPreference.findOne({ user_id: userId }).populate(
    "user_id",
    "username full_name status"
  );

const updateDashboardPreference = async (preferenceId, updateData) =>
  DashboardPreference.findByIdAndUpdate(preferenceId, updateData, {
    new: true,
    runValidators: true,
  }).populate("user_id", "username full_name status");

const deleteDashboardPreference = async (preferenceId) =>
  DashboardPreference.findByIdAndDelete(preferenceId);

module.exports = {
  createDashboardPreference,
  getDashboardPreferenceById,
  getDashboardPreferenceByUser,
  updateDashboardPreference,
  deleteDashboardPreference,
};
