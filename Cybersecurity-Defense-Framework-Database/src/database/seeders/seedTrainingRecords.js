const TrainingMaterial = require("../models/TrainingMaterial.mongo");
const TrainingRecord = require("../models/TrainingRecord.mongo");
const User = require("../models/User.mongo");

const seedTrainingRecords = async () => {
  const users = await User.find({});
  const materials = await TrainingMaterial.find({});

  const userMap = users.reduce((accumulator, user) => {
    accumulator[user.username] = user._id;
    return accumulator;
  }, {});

  const materialMap = materials.reduce((accumulator, material) => {
    accumulator[material.title] = material._id;
    return accumulator;
  }, {});

  const records = [
    {
      user_id: userMap["admin.ncdf"],
      material_id: materialMap["Cybersecurity Awareness Fundamentals"],
      completion_status: "completed",
      completion_date: new Date("2026-04-02T09:00:00.000Z"),
      score: 95,
    },
    {
      user_id: userMap["sara.analyst"],
      material_id: materialMap["Phishing Detection Simulation"],
      completion_status: "completed",
      completion_date: new Date("2026-04-15T10:30:00.000Z"),
      score: 89,
    },
    {
      user_id: userMap["ali.responder"],
      material_id: materialMap["National Incident Response Procedures"],
      completion_status: "in_progress",
    },
    {
      user_id: userMap["nida.compliance"],
      material_id: materialMap["Critical Network Defense Controls"],
      completion_status: "not_started",
    },
  ];

  await TrainingRecord.deleteMany({});
  await TrainingRecord.insertMany(records);

  console.log("Training records seeded successfully.");
};

module.exports = seedTrainingRecords;
