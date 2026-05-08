const Report = require("../models/Report.mongo");

const createReport = async (reportData) => Report.create(reportData);

const getReportById = async (reportId) =>
  Report.findById(reportId)
    .populate("generated_by", "username full_name")
    .populate("related_incident_ids")
    .populate("related_alert_ids")
    .populate("related_event_ids");

const getReportsByUser = async (userId) =>
  Report.find({ generated_by: userId })
    .populate("generated_by", "username full_name")
    .sort({ generated_at: -1 });

const getAllReports = async (filters = {}) =>
  Report.find(filters)
    .populate("generated_by", "username full_name")
    .sort({ generated_at: -1 });

const updateReport = async (reportId, updateData) =>
  Report.findByIdAndUpdate(reportId, updateData, {
    new: true,
    runValidators: true,
  }).populate("generated_by", "username full_name");

const deleteReport = async (reportId) => Report.findByIdAndDelete(reportId);

module.exports = {
  createReport,
  getReportById,
  getReportsByUser,
  getAllReports,
  updateReport,
  deleteReport,
};
