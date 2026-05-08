const Incident = require("../models/Incident.mongo");
const NetworkEvent = require("../models/NetworkEvent.mongo");
const Report = require("../models/Report.mongo");
const SecurityAlert = require("../models/SecurityAlert.mongo");
const User = require("../models/User.mongo");

const seedReports = async () => {
  const users = await User.find({});
  const incidents = await Incident.find({});
  const alerts = await SecurityAlert.find({});
  const events = await NetworkEvent.find({});

  const userMap = users.reduce((accumulator, user) => {
    accumulator[user.username] = user._id;
    return accumulator;
  }, {});

  const reports = [
    {
      report_type: "incident_report",
      generated_at: new Date("2026-05-05T10:00:00.000Z"),
      format: "pdf",
      file_name: "incident-report-001.pdf",
      file_path: "/uploads/reports/incident-report-001.pdf",
      file_url: "https://reports.example.com/incident-report-001.pdf",
      generated_by: userMap["ali.responder"],
      related_incident_ids: incidents.map((incident) => incident._id),
      related_alert_ids: [alerts[1]?._id].filter(Boolean),
      related_event_ids: [events[2]?._id].filter(Boolean),
    },
    {
      report_type: "network_event_summary",
      generated_at: new Date("2026-05-06T08:30:00.000Z"),
      format: "pdf",
      file_name: "network-event-summary-001.pdf",
      file_path: "/uploads/reports/network-event-summary-001.pdf",
      file_url: "https://reports.example.com/network-event-summary-001.pdf",
      generated_by: userMap["sara.analyst"],
      related_incident_ids: [],
      related_alert_ids: alerts.map((alert) => alert._id),
      related_event_ids: events.map((event) => event._id),
    },
  ];

  await Report.deleteMany({});
  await Report.insertMany(reports);

  console.log("Reports seeded successfully.");
};

module.exports = seedReports;
