const Incident = require("../models/Incident.mongo");

const getIncidentsBySeverity = async () =>
  Incident.aggregate([
    {
      $group: {
        _id: "$severity",
        totalIncidents: { $sum: 1 },
      },
    },
    {
      $sort: { totalIncidents: -1, _id: 1 },
    },
  ]);

const getIncidentsByStatus = async () =>
  Incident.aggregate([
    {
      $group: {
        _id: "$status",
        totalIncidents: { $sum: 1 },
      },
    },
    {
      $sort: { totalIncidents: -1, _id: 1 },
    },
  ]);

const getMonthlyIncidentTrend = async () =>
  Incident.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$reported_at" },
          month: { $month: "$reported_at" },
        },
        totalIncidents: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

module.exports = {
  getIncidentsBySeverity,
  getIncidentsByStatus,
  getMonthlyIncidentTrend,
};
