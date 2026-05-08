const Role = require("../models/Role.mongo");
const SystemSetting = require("../models/SystemSetting.mongo");

const seedSystemSettings = async () => {
  const administratorRole = await Role.findOne({ role_name: "administrator" });

  const systemSettings = [
    {
      setting_name: "alert_retention_days",
      setting_value: 365,
      managed_for_role_id: administratorRole?._id,
    },
    {
      setting_name: "incident_auto_escalation_threshold",
      setting_value: {
        severity: "critical",
        max_open_minutes: 30,
      },
      managed_for_role_id: administratorRole?._id,
    },
    {
      setting_name: "default_report_storage_path",
      setting_value: "/uploads/reports",
      managed_for_role_id: administratorRole?._id,
    },
    {
      setting_name: "dashboard_refresh_interval_seconds",
      setting_value: 60,
      managed_for_role_id: administratorRole?._id,
    },
  ];

  await SystemSetting.deleteMany({});
  await SystemSetting.insertMany(systemSettings);

  console.log("System settings seeded successfully.");
};

module.exports = seedSystemSettings;
