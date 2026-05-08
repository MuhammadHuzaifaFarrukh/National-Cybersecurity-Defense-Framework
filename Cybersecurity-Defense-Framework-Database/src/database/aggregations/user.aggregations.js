const User = require("../models/User.mongo");
const ActivityLog = require("../models/ActivityLog.mongo");

const getUsersByStatus = async () =>
  User.aggregate([
    {
      $group: {
        _id: "$status",
        totalUsers: { $sum: 1 },
      },
    },
    {
      $sort: { totalUsers: -1, _id: 1 },
    },
  ]);

const getUsersPerRole = async () =>
  User.aggregate([
    {
      $lookup: {
        from: "roles",
        localField: "role_id",
        foreignField: "_id",
        as: "role",
      },
    },
    { $unwind: "$role" },
    {
      $group: {
        _id: "$role.role_name",
        totalUsers: { $sum: 1 },
      },
    },
    {
      $sort: { totalUsers: -1, _id: 1 },
    },
  ]);

const getUserActivitySummary = async () =>
  ActivityLog.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $group: {
        _id: "$user_id",
        username: { $first: "$user.username" },
        full_name: { $first: "$user.full_name" },
        totalActions: { $sum: 1 },
        lastActionAt: { $max: "$action_time" },
      },
    },
    {
      $sort: { totalActions: -1, lastActionAt: -1 },
    },
  ]);

module.exports = {
  getUsersByStatus,
  getUsersPerRole,
  getUserActivitySummary,
};
