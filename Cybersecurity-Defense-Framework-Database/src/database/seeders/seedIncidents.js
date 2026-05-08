const Incident = require("../models/Incident.mongo");
const SecurityAlert = require("../models/SecurityAlert.mongo");
const User = require("../models/User.mongo");

const seedIncidents = async () => {
  const users = await User.find({});
  const alerts = await SecurityAlert.find({});

  const userMap = users.reduce((accumulator, user) => {
    accumulator[user.username] = user._id;
    return accumulator;
  }, {});

  const alertMap = alerts.reduce((accumulator, alert) => {
    accumulator[alert.title] = alert._id;
    return accumulator;
  }, {});

  const incidents = [
    {
      title: "Credential Phishing Investigation",
      description:
        "A coordinated phishing wave targeted privileged operators through spoofed notification emails.",
      severity: "high",
      status: "under_investigation",
      reported_at: new Date("2026-05-02T12:00:00.000Z"),
      alert_ids: [alertMap["Suspicious phishing campaign targeting operators"]],
      reported_by: userMap["sara.analyst"],
    },
    {
      title: "Command Subnet Intrusion Attempt",
      description:
        "An unauthorized access attempt was detected against a protected command subnet and escalated for containment.",
      severity: "critical",
      status: "contained",
      reported_at: new Date("2026-05-03T04:20:00.000Z"),
      alert_ids: [alertMap["Critical unauthorized access attempt on command subnet"]],
      reported_by: userMap["ali.responder"],
    },
  ];

  await Incident.deleteMany({});
  await Incident.insertMany(incidents);

  console.log("Incidents seeded successfully.");
};

module.exports = seedIncidents;
