const Permission = require("../models/Permission.mongo");

const seedPermissions = async () => {
  const permissions = [
    {
      permission_name: "USER_CREATE",
      description: "Allows creating new system users.",
    },
    {
      permission_name: "USER_READ",
      description: "Allows viewing user account information.",
    },
    {
      permission_name: "USER_UPDATE",
      description: "Allows updating user profiles and statuses.",
    },
    {
      permission_name: "INCIDENT_CREATE",
      description: "Allows reporting cybersecurity incidents.",
    },
    {
      permission_name: "INCIDENT_UPDATE",
      description: "Allows updating incident investigation status.",
    },
    {
      permission_name: "ALERT_MANAGE",
      description: "Allows triaging and resolving security alerts.",
    },
    {
      permission_name: "REPORT_GENERATE",
      description: "Allows generating PDF cybersecurity reports.",
    },
    {
      permission_name: "TRAINING_MANAGE",
      description: "Allows managing cybersecurity training materials.",
    },
    {
      permission_name: "SETTINGS_MANAGE",
      description: "Allows modifying protected system settings.",
    },
    {
      permission_name: "RESOURCE_VIEW",
      description: "Allows viewing protected data resources.",
    },
  ];

  await Permission.deleteMany({});
  await Permission.insertMany(permissions);

  console.log("Permissions seeded successfully.");
};

module.exports = seedPermissions;
