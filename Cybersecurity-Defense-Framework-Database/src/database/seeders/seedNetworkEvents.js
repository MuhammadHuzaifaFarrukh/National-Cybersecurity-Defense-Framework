const NetworkEvent = require("../models/NetworkEvent.mongo");
const User = require("../models/User.mongo");

const seedNetworkEvents = async () => {
  const users = await User.find({});
  const userMap = users.reduce((accumulator, user) => {
    accumulator[user.username] = user._id;
    return accumulator;
  }, {});

  const events = [
    {
      event_type: "login_attempt",
      source_ip: "10.10.1.15",
      destination_ip: "172.16.0.10",
      timestamp: new Date("2026-05-01T07:15:00.000Z"),
      status: "reviewed",
      generated_by: userMap["sara.analyst"],
    },
    {
      event_type: "phishing_attempt",
      source_ip: "203.0.113.12",
      destination_ip: "172.16.0.35",
      timestamp: new Date("2026-05-02T11:20:00.000Z"),
      status: "escalated",
      generated_by: userMap["sara.analyst"],
    },
    {
      event_type: "unauthorized_access",
      source_ip: "198.51.100.30",
      destination_ip: "172.16.0.55",
      timestamp: new Date("2026-05-03T03:42:00.000Z"),
      status: "new",
      generated_by: userMap["ali.responder"],
    },
    {
      event_type: "malware_detection",
      source_ip: "10.20.4.12",
      destination_ip: "172.16.0.88",
      timestamp: new Date("2026-05-04T13:05:00.000Z"),
      status: "reviewed",
      generated_by: userMap["admin.ncdf"],
    },
  ];

  await NetworkEvent.deleteMany({});
  await NetworkEvent.insertMany(events);

  console.log("Network events seeded successfully.");
};

module.exports = seedNetworkEvents;
