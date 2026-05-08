const TrainingMaterial = require("../models/TrainingMaterial.mongo");

const seedTrainingMaterials = async () => {
  const trainingMaterials = [
    {
      title: "Cybersecurity Awareness Fundamentals",
      category: "cybersecurity_awareness",
      content_type: "pdf",
      content_url: "https://training.example.com/materials/cybersecurity-awareness.pdf",
    },
    {
      title: "Phishing Detection Simulation",
      category: "phishing_prevention",
      content_type: "quiz",
      content_url: "https://training.example.com/materials/phishing-simulation",
    },
    {
      title: "National Incident Response Procedures",
      category: "incident_response",
      content_type: "presentation",
      content_url: "https://training.example.com/materials/incident-response-procedures",
    },
    {
      title: "Critical Network Defense Controls",
      category: "network_security",
      content_type: "video",
      content_url: "https://training.example.com/materials/network-defense-controls",
    },
  ];

  await TrainingMaterial.deleteMany({});
  await TrainingMaterial.insertMany(trainingMaterials);

  console.log("Training materials seeded successfully.");
};

module.exports = seedTrainingMaterials;
