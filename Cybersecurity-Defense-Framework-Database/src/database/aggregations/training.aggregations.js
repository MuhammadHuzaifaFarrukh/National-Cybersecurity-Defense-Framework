const TrainingRecord = require("../models/TrainingRecord.mongo");

const getTrainingCompletionStats = async () =>
  TrainingRecord.aggregate([
    {
      $group: {
        _id: "$completion_status",
        totalRecords: { $sum: 1 },
      },
    },
    {
      $sort: { totalRecords: -1, _id: 1 },
    },
  ]);

const getTrainingScoresByCategory = async () =>
  TrainingRecord.aggregate([
    {
      $lookup: {
        from: "trainingmaterials",
        localField: "material_id",
        foreignField: "_id",
        as: "material",
      },
    },
    { $unwind: "$material" },
    {
      $group: {
        _id: "$material.category",
        averageScore: { $avg: "$score" },
        completedCount: {
          $sum: {
            $cond: [{ $eq: ["$completion_status", "completed"] }, 1, 0],
          },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

module.exports = {
  getTrainingCompletionStats,
  getTrainingScoresByCategory,
};
