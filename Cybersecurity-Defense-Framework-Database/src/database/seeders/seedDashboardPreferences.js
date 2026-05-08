const DashboardPreference = require("../models/DashboardPreference.mongo");
const User = require("../models/User.mongo");

const seedDashboardPreferences = async () => {
  const users = await User.find({});
  const preferences = users.map((user, index) => ({
    user_id: user._id,
    theme: index % 2 === 0 ? "dark" : "system",
    layout: index === 0 ? "expanded" : "default",
    notification_mode: index === 3 ? "email" : "in_app",
  }));

  await DashboardPreference.deleteMany({});
  await DashboardPreference.insertMany(preferences);

  console.log("Dashboard preferences seeded successfully.");
};

module.exports = seedDashboardPreferences;
