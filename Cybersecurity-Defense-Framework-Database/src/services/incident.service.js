const incidentCrud = require("../database/crud/incident.crud");
const incidentAggregations = require("../database/aggregations/incident.aggregations");

const reportIncident = async (incidentData) => incidentCrud.createIncident(incidentData);

module.exports = {
  reportIncident,
  getIncidentById: incidentCrud.getIncidentById,
  getAllIncidents: incidentCrud.getAllIncidents,
  updateIncident: incidentCrud.updateIncident,
  updateIncidentStatus: incidentCrud.updateIncidentStatus,
  deleteIncident: incidentCrud.deleteIncident,
  getIncidentsBySeverity: incidentAggregations.getIncidentsBySeverity,
  getIncidentsByStatus: incidentAggregations.getIncidentsByStatus,
  getMonthlyIncidentTrend: incidentAggregations.getMonthlyIncidentTrend,
};
