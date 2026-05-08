const NetworkEvent = require("../models/NetworkEvent.mongo");

const getNetworkEventsByType = async () =>
  NetworkEvent.aggregate([
    {
      $group: {
        _id: "$event_type",
        totalEvents: { $sum: 1 },
      },
    },
    {
      $sort: { totalEvents: -1, _id: 1 },
    },
  ]);

const getMonthlyNetworkEventTrend = async () =>
  NetworkEvent.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$timestamp" },
          month: { $month: "$timestamp" },
        },
        totalEvents: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

module.exports = {
  getNetworkEventsByType,
  getMonthlyNetworkEventTrend,
};
