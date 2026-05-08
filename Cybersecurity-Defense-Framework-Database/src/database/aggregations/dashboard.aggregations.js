const Incident = require("../models/Incident.mongo");
const SecurityAlert = require("../models/SecurityAlert.mongo");
const NetworkEvent = require("../models/NetworkEvent.mongo");
const TrainingRecord = require("../models/TrainingRecord.mongo");

const getDashboardSummary = async () => {
  const [totalIncidents, openAlerts, totalNetworkEvents, completedTrainings] =
    await Promise.all([
      Incident.countDocuments(),
      SecurityAlert.countDocuments({ status: "open" }),
      NetworkEvent.countDocuments(),
      TrainingRecord.countDocuments({ completion_status: "completed" }),
    ]);

  return {
    totalIncidents,
    openAlerts,
    totalNetworkEvents,
    completedTrainings,
  };
};

module.exports = {
  getDashboardSummary,
};
