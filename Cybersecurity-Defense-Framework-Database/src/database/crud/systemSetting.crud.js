const SystemSetting = require("../models/SystemSetting.mongo");

const createSystemSetting = async (settingData) => SystemSetting.create(settingData);

const getSystemSettingById = async (settingId) =>
  SystemSetting.findById(settingId).populate("managed_for_role_id", "role_name");

const getAllSystemSettings = async (filters = {}) =>
  SystemSetting.find(filters)
    .populate("managed_for_role_id", "role_name")
    .sort({ setting_name: 1 });

const updateSystemSetting = async (settingId, updateData) =>
  SystemSetting.findByIdAndUpdate(settingId, updateData, {
    new: true,
    runValidators: true,
  }).populate("managed_for_role_id", "role_name");

const deleteSystemSetting = async (settingId) =>
  SystemSetting.findByIdAndDelete(settingId);

module.exports = {
  createSystemSetting,
  getSystemSettingById,
  getAllSystemSettings,
  updateSystemSetting,
  deleteSystemSetting,
};
