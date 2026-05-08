const SecurityAlert = require("../models/SecurityAlert.mongo");

const createSecurityAlert = async (alertData) => SecurityAlert.create(alertData);

const getSecurityAlertById = async (alertId) =>
  SecurityAlert.findById(alertId)
    .populate("network_event_id")
    .populate("reported_by", "username full_name");

const getAllSecurityAlerts = async (filters = {}) =>
  SecurityAlert.find(filters)
    .populate("network_event_id")
    .populate("reported_by", "username full_name")
    .sort({ detected_at: -1 });

const updateSecurityAlert = async (alertId, updateData) =>
  SecurityAlert.findByIdAndUpdate(alertId, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("network_event_id")
    .populate("reported_by", "username full_name");

const deleteSecurityAlert = async (alertId) => SecurityAlert.findByIdAndDelete(alertId);

module.exports = {
  createSecurityAlert,
  getSecurityAlertById,
  getAllSecurityAlerts,
  updateSecurityAlert,
  deleteSecurityAlert,
};
