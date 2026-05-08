const bcrypt = require("bcryptjs");

const userCrud = require("../database/crud/user.crud");
const dashboardPreferenceCrud = require("../database/crud/dashboardPreference.crud");
const userAggregations = require("../database/aggregations/user.aggregations");

const createUserWithPassword = async (userData) => {
  const passwordHash = await bcrypt.hash(userData.password, 12);

  const createdUser = await userCrud.createUser({
    username: userData.username,
    full_name: userData.full_name,
    status: userData.status || "active",
    role_id: userData.role_id,
    password_hash: passwordHash,
  });

  await dashboardPreferenceCrud.createDashboardPreference({
    user_id: createdUser._id,
  });

  return userCrud.getUserById(createdUser._id);
};

const getUserProfileBundle = async (userId) => {
  const [user, preferences] = await Promise.all([
    userCrud.getUserById(userId),
    dashboardPreferenceCrud.getDashboardPreferenceByUser(userId),
  ]);

  return { user, preferences };
};

module.exports = {
  createUserWithPassword,
  getUserProfileBundle,
  getUsersByStatus: userAggregations.getUsersByStatus,
  getUsersPerRole: userAggregations.getUsersPerRole,
  getUserActivitySummary: userAggregations.getUserActivitySummary,
};
