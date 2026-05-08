const SecurityAlert = require("../models/SecurityAlert.mongo");

const getAlertsByStatus = async () =>
  SecurityAlert.aggregate([
    {
      $group: {
        _id: "$status",
        totalAlerts: { $sum: 1 },
      },
    },
    {
      $sort: { totalAlerts: -1, _id: 1 },
    },
  ]);

const getAlertsBySeverity = async () =>
  SecurityAlert.aggregate([
    {
      $group: {
        _id: "$severity",
        totalAlerts: { $sum: 1 },
      },
    },
    {
      $sort: { totalAlerts: -1, _id: 1 },
    },
  ]);

module.exports = {
  getAlertsByStatus,
  getAlertsBySeverity,
};
