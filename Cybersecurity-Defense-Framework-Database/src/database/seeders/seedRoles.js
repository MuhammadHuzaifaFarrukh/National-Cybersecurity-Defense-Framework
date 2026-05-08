const Permission = require("../models/Permission.mongo");
const Role = require("../models/Role.mongo");

const seedRoles = async () => {
  const permissions = await Permission.find({});
  const permissionMap = permissions.reduce((accumulator, permission) => {
    accumulator[permission.permission_name] = permission._id;
    return accumulator;
  }, {});

  const roles = [
    {
      role_name: "administrator",
      description: "Full access to the cybersecurity defense platform.",
      permission_ids: Object.values(permissionMap),
    },
    {
      role_name: "security_analyst",
      description: "Monitors events, alerts, incidents, and reports.",
      permission_ids: [
        permissionMap.USER_READ,
        permissionMap.INCIDENT_CREATE,
        permissionMap.INCIDENT_UPDATE,
        permissionMap.ALERT_MANAGE,
        permissionMap.REPORT_GENERATE,
        permissionMap.RESOURCE_VIEW,
      ].filter(Boolean),
    },
    {
      role_name: "incident_responder",
      description: "Handles incident investigation and containment workflows.",
      permission_ids: [
        permissionMap.USER_READ,
        permissionMap.INCIDENT_CREATE,
        permissionMap.INCIDENT_UPDATE,
        permissionMap.ALERT_MANAGE,
        permissionMap.REPORT_GENERATE,
      ].filter(Boolean),
    },
    {
      role_name: "compliance_officer",
      description: "Reviews training, compliance reports, and governance settings.",
      permission_ids: [
        permissionMap.USER_READ,
        permissionMap.REPORT_GENERATE,
        permissionMap.TRAINING_MANAGE,
        permissionMap.RESOURCE_VIEW,
      ].filter(Boolean),
    },
  ];

  await Role.deleteMany({});
  await Role.insertMany(roles);

  console.log("Roles seeded successfully.");
};

module.exports = seedRoles;
