const Report = require("../models/Report.mongo");

const getReportsGeneratedPerUser = async () =>
  Report.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "generated_by",
        foreignField: "_id",
        as: "generator",
      },
    },
    { $unwind: "$generator" },
    {
      $group: {
        _id: "$generated_by",
        username: { $first: "$generator.username" },
        full_name: { $first: "$generator.full_name" },
        totalReports: { $sum: 1 },
      },
    },
    {
      $sort: { totalReports: -1, username: 1 },
    },
  ]);

const getReportsByType = async () =>
  Report.aggregate([
    {
      $group: {
        _id: "$report_type",
        totalReports: { $sum: 1 },
      },
    },
    {
      $sort: { totalReports: -1, _id: 1 },
    },
  ]);

module.exports = {
  getReportsGeneratedPerUser,
  getReportsByType,
};
