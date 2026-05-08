const Incident = require("../models/Incident.mongo");

const createIncident = async (incidentData) => Incident.create(incidentData);

const getIncidentById = async (incidentId) =>
  Incident.findById(incidentId)
    .populate("reported_by", "username full_name status")
    .populate("alert_ids");

const getAllIncidents = async (filters = {}) =>
  Incident.find(filters)
    .populate("reported_by", "username full_name")
    .populate("alert_ids")
    .sort({ reported_at: -1 });

const updateIncident = async (incidentId, updateData) =>
  Incident.findByIdAndUpdate(incidentId, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("reported_by", "username full_name")
    .populate("alert_ids");

const updateIncidentStatus = async (incidentId, status) =>
  Incident.findByIdAndUpdate(
    incidentId,
    { status },
    { new: true, runValidators: true }
  );

const deleteIncident = async (incidentId) => Incident.findByIdAndDelete(incidentId);

module.exports = {
  createIncident,
  getIncidentById,
  getAllIncidents,
  updateIncident,
  updateIncidentStatus,
  deleteIncident,
};
