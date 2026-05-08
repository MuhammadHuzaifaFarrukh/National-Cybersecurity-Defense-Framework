const NetworkEvent = require("../models/NetworkEvent.mongo");
const SecurityAlert = require("../models/SecurityAlert.mongo");
const User = require("../models/User.mongo");

const seedSecurityAlerts = async () => {
  const users = await User.find({});
  const events = await NetworkEvent.find({});

  const userMap = users.reduce((accumulator, user) => {
    accumulator[user.username] = user._id;
    return accumulator;
  }, {});

  const eventMap = events.reduce((accumulator, event) => {
    accumulator[event.event_type] = accumulator[event.event_type] || [];
    accumulator[event.event_type].push(event._id);
    return accumulator;
  }, {});

  const alerts = [
    {
      title: "Suspicious phishing campaign targeting operators",
      severity: "high",
      status: "investigating",
      detected_at: new Date("2026-05-02T11:35:00.000Z"),
      network_event_id: eventMap.phishing_attempt?.[0],
      reported_by: userMap["sara.analyst"],
    },
    {
      title: "Critical unauthorized access attempt on command subnet",
      severity: "critical",
      status: "open",
      detected_at: new Date("2026-05-03T03:55:00.000Z"),
      network_event_id: eventMap.unauthorized_access?.[0],
      reported_by: userMap["ali.responder"],
    },
    {
      title: "Malware signature detected on protected endpoint",
      severity: "medium",
      status: "resolved",
      detected_at: new Date("2026-05-04T13:10:00.000Z"),
      network_event_id: eventMap.malware_detection?.[0],
      reported_by: userMap["admin.ncdf"],
    },
  ];

  await SecurityAlert.deleteMany({});
  await SecurityAlert.insertMany(alerts);

  console.log("Security alerts seeded successfully.");
};

module.exports = seedSecurityAlerts;
