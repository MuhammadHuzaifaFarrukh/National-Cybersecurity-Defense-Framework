const ActivityLog = require("../models/ActivityLog.mongo");

const createActivityLog = async (logData) => ActivityLog.create(logData);

const getActivityLogById = async (logId) =>
  ActivityLog.findById(logId).populate("user_id", "username full_name");

const getAllActivityLogs = async (filters = {}) =>
  ActivityLog.find(filters)
    .populate("user_id", "username full_name")
    .sort({ action_time: -1 });

const updateActivityLog = async (logId, updateData) =>
  ActivityLog.findByIdAndUpdate(logId, updateData, {
    new: true,
    runValidators: true,
  }).populate("user_id", "username full_name");

const deleteActivityLog = async (logId) => ActivityLog.findByIdAndDelete(logId);

module.exports = {
  createActivityLog,
  getActivityLogById,
  getAllActivityLogs,
  updateActivityLog,
  deleteActivityLog,
};
