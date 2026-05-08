const alertCrud = require("../database/crud/securityAlert.crud");
const alertAggregations = require("../database/aggregations/securityAlert.aggregations");

const raiseSecurityAlert = async (alertData) => alertCrud.createSecurityAlert(alertData);

module.exports = {
  raiseSecurityAlert,
  getSecurityAlertById: alertCrud.getSecurityAlertById,
  getAllSecurityAlerts: alertCrud.getAllSecurityAlerts,
  updateSecurityAlert: alertCrud.updateSecurityAlert,
  deleteSecurityAlert: alertCrud.deleteSecurityAlert,
  getAlertsByStatus: alertAggregations.getAlertsByStatus,
  getAlertsBySeverity: alertAggregations.getAlertsBySeverity,
};
